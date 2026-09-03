import uuid
from sqlalchemy import Column, String, Integer, Enum, Numeric, TIMESTAMP, ForeignKey, func
from sqlalchemy.orm import relationship
from app.core.database import Base

class Vehicle(Base):
    __tablename__ = "vehicles"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    owner_id = Column(String(36), ForeignKey("owners.id", ondelete="CASCADE"), nullable=False)
    vehicle_type = Column(Enum("car", "van", "motorcycle", name="vehicle_type"), nullable=False)
    brand = Column(String(50))
    model = Column(String(50))
    year = Column(Integer)
    plate_number = Column(String(20), unique=True, nullable=False)
    transmission = Column(Enum("automatic", "manual", name="transmission_type"))
    seats = Column(Integer)
    price_per_day = Column(Numeric(10, 2), nullable=False)
    image_url = Column(String(255))
    status = Column(Enum("pending", "available", "rented", "maintenance", "rejected", name="vehicle_status"), default="pending")
    created_at = Column(TIMESTAMP, server_default=func.now())

    owner = relationship("Owner", back_populates="vehicles")