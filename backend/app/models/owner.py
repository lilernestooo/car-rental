import uuid
from sqlalchemy import Column, String, Enum, TIMESTAMP, func
from sqlalchemy.orm import relationship
from app.core.database import Base

class Owner(Base):
    __tablename__ = "owners"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    business_name = Column(String(150), nullable=False)
    owner_name = Column(String(100), nullable=False)
    email = Column(String(150), unique=True, nullable=False, index=True)
    phone = Column(String(20))
    password_hash = Column(String(255), nullable=False)
    business_permit_number = Column(String(100))
    status = Column(Enum("pending", "approved", "rejected", "suspended", name="owner_status"), default="pending")
    created_at = Column(TIMESTAMP, server_default=func.now())

    staff = relationship("Staff", back_populates="owner", cascade="all, delete")
    vehicles = relationship("Vehicle", back_populates="owner", cascade="all, delete")