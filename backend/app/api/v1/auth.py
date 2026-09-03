from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from pydantic import EmailStr
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.security import (
    hash_password, verify_password,
    create_access_token, create_refresh_token, decode_token
)
from app.models.admin import Admin
from app.models.owner import Owner
from app.models.staff import Staff
from app.models.user import User

from app.schemas.auth import LoginRequest, TokenResponse, RefreshRequest
from app.schemas.owner import OwnerRegister, OwnerOut
from app.schemas.user import UserOut, VerifyCodeRequest, ResendCodeRequest

from app.utils.file_upload import save_license_file
from app.utils.verification import generate_verification_code, code_expiry, send_verification_email

router = APIRouter(prefix="/auth", tags=["Auth"])


def _issue_tokens(subject_id: str, role: str) -> TokenResponse:
    return TokenResponse(
        access_token=create_access_token(subject_id, role),
        refresh_token=create_refresh_token(subject_id, role),
        role=role,
    )


# ---------- ADMIN ----------

@router.post("/admin/login", response_model=TokenResponse)
def admin_login(data: LoginRequest, db: Session = Depends(get_db)):
    admin = db.query(Admin).filter(Admin.email == data.email).first()
    if not admin or not verify_password(data.password, admin.password_hash):
        raise HTTPException(status_code=401, detail="Incorrect email or password")
    return _issue_tokens(admin.id, admin.role)


# ---------- OWNER ----------

@router.post("/owner/register", response_model=OwnerOut)
def owner_register(data: OwnerRegister, db: Session = Depends(get_db)):
    if db.query(Owner).filter(Owner.email == data.email).first():
        raise HTTPException(status_code=400, detail="Email already registered")
    owner = Owner(
        business_name=data.business_name,
        owner_name=data.owner_name,
        email=data.email,
        phone=data.phone,
        password_hash=hash_password(data.password),
        business_permit_number=data.business_permit_number,
    )
    db.add(owner)
    db.commit()
    db.refresh(owner)
    return owner


@router.post("/owner/login", response_model=TokenResponse)
def owner_login(data: LoginRequest, db: Session = Depends(get_db)):
    owner = db.query(Owner).filter(Owner.email == data.email).first()
    if not owner or not verify_password(data.password, owner.password_hash):
        raise HTTPException(status_code=401, detail="Incorrect email or password")
    if owner.status != "approved":
        raise HTTPException(status_code=403, detail=f"Account status: {owner.status}")
    return _issue_tokens(owner.id, "owner")


# ---------- STAFF ----------

@router.post("/staff/login", response_model=TokenResponse)
def staff_login(data: LoginRequest, db: Session = Depends(get_db)):
    staff = db.query(Staff).filter(Staff.email == data.email).first()
    if not staff or not verify_password(data.password, staff.password_hash):
        raise HTTPException(status_code=401, detail="Incorrect email or password")
    if not staff.is_active:
        raise HTTPException(status_code=403, detail="Staff account is inactive")
    return _issue_tokens(staff.id, staff.role)


# ---------- TOKEN REFRESH ----------

@router.post("/refresh", response_model=TokenResponse)
def refresh_token(data: RefreshRequest):
    payload = decode_token(data.refresh_token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid or expired refresh token")
    return _issue_tokens(payload["sub"], payload["role"])


# ---------- USER (with license verification) ----------

@router.post("/user/register", response_model=UserOut)
def user_register(
    name: str = Form(...),
    email: EmailStr = Form(...),
    phone: str = Form(None),
    password: str = Form(...),
    license_number: str = Form(...),
    license_file: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    if db.query(User).filter(User.email == email).first():
        raise HTTPException(status_code=400, detail="Email already registered")

    license_image_url = save_license_file(license_file)
    code = generate_verification_code()

    user = User(
        name=name,
        email=email,
        phone=phone,
        password_hash=hash_password(password),
        license_number=license_number,
        license_image_url=license_image_url,
        is_verified=False,
        verification_code=code,
        verification_code_expires_at=code_expiry(),
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    send_verification_email(user.email, code)

    return user


@router.post("/user/verify")
def user_verify(data: VerifyCodeRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == data.email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    if user.is_verified:
        return {"detail": "Account already verified"}
    if not user.verification_code or user.verification_code != data.code:
        raise HTTPException(status_code=400, detail="Invalid verification code")
    if datetime.utcnow() > user.verification_code_expires_at:
        raise HTTPException(status_code=400, detail="Verification code expired")

    user.is_verified = True
    user.verification_code = None
    user.verification_code_expires_at = None
    db.commit()

    return {"detail": "Account verified successfully"}


@router.post("/user/resend-code")
def resend_code(data: ResendCodeRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == data.email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    if user.is_verified:
        return {"detail": "Account already verified"}

    code = generate_verification_code()
    user.verification_code = code
    user.verification_code_expires_at = code_expiry()
    db.commit()

    send_verification_email(user.email, code)
    return {"detail": "Verification code resent"}


@router.post("/user/login", response_model=TokenResponse)
def user_login(data: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == data.email).first()
    if not user or not verify_password(data.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Incorrect email or password")
    if not user.is_verified:
        raise HTTPException(status_code=403, detail="Please verify your account first")
    return _issue_tokens(user.id, "user")