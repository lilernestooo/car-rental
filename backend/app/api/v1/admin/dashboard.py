from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.core.database import get_db
from app.api.deps import get_current_admin
from app.models.owner import Owner
from app.models.user import User
from app.models.vehicle import Vehicle
from app.models.booking import Booking
from app.models.payment import Payment

router = APIRouter(prefix="/dashboard", tags=["Admin - Dashboard"])

@router.get("/stats")
def get_stats(db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    total_revenue = db.query(func.sum(Payment.amount)).filter(Payment.status == "paid").scalar() or 0
    return {
        "total_owners": db.query(Owner).count(),
        "pending_owners": db.query(Owner).filter(Owner.status == "pending").count(),
        "total_users": db.query(User).count(),
        "total_vehicles": db.query(Vehicle).count(),
        "pending_vehicles": db.query(Vehicle).filter(Vehicle.status == "pending").count(),
        "total_bookings": db.query(Booking).count(),
        "active_bookings": db.query(Booking).filter(Booking.status.in_(["confirmed", "ongoing"])).count(),
        "total_revenue": float(total_revenue),
    }