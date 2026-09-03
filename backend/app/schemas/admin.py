from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional

class AdminOut(BaseModel):
    id: str
    name: str
    email: EmailStr
    role: str
    created_at: datetime

    class Config:
        from_attributes = True

class AdminCreate(BaseModel):
    name: str
    email: EmailStr
    password: str
    role: str = "admin"  # admin | superadmin

class AdminUpdate(BaseModel):
    name: Optional[str] = None
    role: Optional[str] = None