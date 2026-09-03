from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.api.deps import get_current_admin
from app.core.security import hash_password
from app.models.admin import Admin
from app.schemas.admin import AdminOut, AdminCreate, AdminUpdate

router = APIRouter(prefix="/admins", tags=["Admin - Manage Admins"])


def _require_superadmin(admin: Admin):
    if admin.role != "superadmin":
        raise HTTPException(status_code=403, detail="Only a superadmin can manage admin accounts")


@router.get("/", response_model=List[AdminOut])
def list_admins(db: Session = Depends(get_db), admin: Admin = Depends(get_current_admin)):
    _require_superadmin(admin)
    return db.query(Admin).order_by(Admin.created_at.desc()).all()


@router.post("/", response_model=AdminOut)
def create_admin(data: AdminCreate, db: Session = Depends(get_db), admin: Admin = Depends(get_current_admin)):
    _require_superadmin(admin)
    if db.query(Admin).filter(Admin.email == data.email).first():
        raise HTTPException(status_code=400, detail="Email already registered")

    new_admin = Admin(
        name=data.name,
        email=data.email,
        password_hash=hash_password(data.password),
        role=data.role,
    )
    db.add(new_admin)
    db.commit()
    db.refresh(new_admin)
    return new_admin


@router.put("/{admin_id}", response_model=AdminOut)
def update_admin(admin_id: str, data: AdminUpdate, db: Session = Depends(get_db), admin: Admin = Depends(get_current_admin)):
    _require_superadmin(admin)
    target = db.query(Admin).filter(Admin.id == admin_id).first()
    if not target:
        raise HTTPException(status_code=404, detail="Admin not found")
    for field, value in data.dict(exclude_unset=True).items():
        setattr(target, field, value)
    db.commit()
    db.refresh(target)
    return target


@router.delete("/{admin_id}")
def delete_admin(admin_id: str, db: Session = Depends(get_db), admin: Admin = Depends(get_current_admin)):
    _require_superadmin(admin)
    if admin.id == admin_id:
        raise HTTPException(status_code=400, detail="You cannot delete your own account")
    target = db.query(Admin).filter(Admin.id == admin_id).first()
    if not target:
        raise HTTPException(status_code=404, detail="Admin not found")
    db.delete(target)
    db.commit()
    return {"detail": "Admin deleted"}