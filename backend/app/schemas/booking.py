from pydantic import BaseModel
from datetime import date, datetime
from decimal import Decimal

class BookingOut(BaseModel):
    id: str
    user_id: str
    vehicle_id: str
    owner_id: str
    start_date: date
    end_date: date
    pickup_location: str | None
    total_price: Decimal
    status: str
    created_at: datetime

    class Config:
        from_attributes = True

class BookingStatusUpdate(BaseModel):
    status: str