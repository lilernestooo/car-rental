from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional

class OwnerRegister(BaseModel):
    business_name: str
    owner_name: str
    email: EmailStr
    phone: Optional[str] = None
    password: str
    business_permit_number: Optional[str] = None

class OwnerOut(BaseModel):
    id: str
    business_name: str
    owner_name: str
    email: EmailStr
    phone: Optional[str]
    status: str
    created_at: datetime

    class Config:
        from_attributes = True

class OwnerStatusUpdate(BaseModel):
    status: str