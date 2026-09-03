import uuid
from sqlalchemy import Column, String, Enum, TIMESTAMP, func
from app.core.database import Base

class Admin(Base):
    __tablename__ = "admins"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String(100), nullable=False)
    email = Column(String(150), unique=True, nullable=False, index=True)
    password_hash = Column(String(255), nullable=False)
    role = Column(Enum("superadmin", "admin", name="admin_role"), default="admin")
    created_at = Column(TIMESTAMP, server_default=func.now())