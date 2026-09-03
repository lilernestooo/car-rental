from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.security import decode_token
from app.models.admin import Admin
from app.models.owner import Owner
from app.models.staff import Staff

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/admin/login")

def _get_current(token: str, db: Session, allowed_roles: list[str]):
    payload = decode_token(token)
    if not payload or payload.get("role") not in allowed_roles:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid or expired token")
    return payload

def get_current_admin(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)) -> Admin:
    payload = _get_current(token, db, ["admin", "superadmin"])
    admin = db.query(Admin).filter(Admin.id == payload["sub"]).first()
    if not admin:
        raise HTTPException(status_code=404, detail="Admin not found")
    return admin

def get_current_owner(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)) -> Owner:
    payload = _get_current(token, db, ["owner"])
    owner = db.query(Owner).filter(Owner.id == payload["sub"]).first()
    if not owner:
        raise HTTPException(status_code=404, detail="Owner not found")
    return owner

def get_current_staff(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)) -> Staff:
    payload = _get_current(token, db, ["staff", "manager"])
    staff = db.query(Staff).filter(Staff.id == payload["sub"]).first()
    if not staff:
        raise HTTPException(status_code=404, detail="Staff not found")
    return staff

def get_current_owner_or_staff(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    """Returns (owner_id, actor) — lets both an owner and their staff hit owner-scoped routes."""
    payload = decode_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    role = payload.get("role")
    if role == "owner":
        owner = db.query(Owner).filter(Owner.id == payload["sub"]).first()
        if not owner:
            raise HTTPException(status_code=404, detail="Owner not found")
        return owner.id, owner
    elif role in ("staff", "manager"):
        staff = db.query(Staff).filter(Staff.id == payload["sub"]).first()
        if not staff:
            raise HTTPException(status_code=404, detail="Staff not found")
        return staff.owner_id, staff
    raise HTTPException(status_code=401, detail="Not authorized")