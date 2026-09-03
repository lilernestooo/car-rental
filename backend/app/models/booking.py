import uuid
from sqlalchemy import Column, String, Date, Enum, Numeric, TIMESTAMP, ForeignKey, func
from app.core.database import Base

class Booking(Base):
    __tablename__ = "bookings"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String(36), ForeignKey("users.id"), nullable=False)
    vehicle_id = Column(String(36), ForeignKey("vehicles.id"), nullable=False)
    owner_id = Column(String(36), ForeignKey("owners.id"), nullable=False)
    start_date = Column(Date, nullable=False)
    end_date = Column(Date, nullable=False)
    pickup_location = Column(String(255))
    total_price = Column(Numeric(10, 2), nullable=False)
    status = Column(Enum("pending", "confirmed", "ongoing", "completed", "cancelled", name="booking_status"), default="pending")
    created_at = Column(TIMESTAMP, server_default=func.now())