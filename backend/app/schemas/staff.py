from pydantic import BaseModel, EmailStr
from typing import Optional

class StaffCreate(BaseModel):
    name: str
    email: EmailStr
    password: str
    role: str = "staff"

class StaffOut(BaseModel):
    id: str
    name: str
    email: EmailStr
    role: str
    is_active: bool

    class Config:
        from_attributes = True

class StaffUpdate(BaseModel):
    name: Optional[str] = None
    role: Optional[str] = None
    is_active: Optional[bool] = None