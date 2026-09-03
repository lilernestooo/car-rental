from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.api.deps import get_current_admin
from app.models.owner import Owner
from app.schemas.owner import OwnerOut, OwnerStatusUpdate

router = APIRouter(prefix="/owners", tags=["Admin - Owners"])

@router.get("/", response_model=List[OwnerOut])
def list_owners(status: str | None = None, db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    q = db.query(Owner)
    if status:
        q = q.filter(Owner.status == status)
    return q.order_by(Owner.created_at.desc()).all()

@router.patch("/{owner_id}/status", response_model=OwnerOut)
def update_owner_status(owner_id: str, data: OwnerStatusUpdate, db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    owner = db.query(Owner).filter(Owner.id == owner_id).first()
    if not owner:
        raise HTTPException(status_code=404, detail="Owner not found")
    owner.status = data.status
    db.commit()
    db.refresh(owner)
    return owner