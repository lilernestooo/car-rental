from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional

class UserOut(BaseModel):
    id: str
    name: str
    email: EmailStr
    phone: Optional[str]
    license_number: Optional[str]
    license_image_url: Optional[str]
    is_verified: bool
    created_at: datetime

    class Config:
        from_attributes = True

class VerifyCodeRequest(BaseModel):
    email: EmailStr
    code: str

class ResendCodeRequest(BaseModel):
    email: EmailStr