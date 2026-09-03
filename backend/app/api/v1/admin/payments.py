from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.api.deps import get_current_admin
from app.models.payment import Payment
from app.schemas.payment import PaymentOut

router = APIRouter(prefix="/payments", tags=["Admin - Payments"])

@router.get("/", response_model=List[PaymentOut])
def list_payments(status: str | None = None, db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    q = db.query(Payment)
    if status:
        q = q.filter(Payment.status == status)
    return q.order_by(Payment.created_at.desc()).all()