from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.api.deps import get_current_admin
from app.models.booking import Booking
from app.schemas.booking import BookingOut

router = APIRouter(prefix="/bookings", tags=["Admin - Bookings"])

@router.get("/", response_model=List[BookingOut])
def list_bookings(status: str | None = None, db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    q = db.query(Booking)
    if status:
        q = q.filter(Booking.status == status)
    return q.order_by(Booking.created_at.desc()).all()