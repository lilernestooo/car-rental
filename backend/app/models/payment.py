import uuid
from sqlalchemy import Column, String, Enum, Numeric, TIMESTAMP, ForeignKey, func
from app.core.database import Base

class Payment(Base):
    __tablename__ = "payments"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    booking_id = Column(String(36), ForeignKey("bookings.id"), nullable=False)
    amount = Column(Numeric(10, 2), nullable=False)
    method = Column(Enum("cash", "gcash", "card", "bank_transfer", name="payment_method"), default="cash")
    status = Column(Enum("pending", "paid", "refunded", "failed", name="payment_status"), default="pending")
    transaction_ref = Column(String(100))
    paid_at = Column(TIMESTAMP, nullable=True)
    created_at = Column(TIMESTAMP, server_default=func.now())