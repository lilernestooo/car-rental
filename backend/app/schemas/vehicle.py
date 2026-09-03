from pydantic import BaseModel
from typing import Optional
from decimal import Decimal

class VehicleCreate(BaseModel):
    vehicle_type: str
    brand: str
    model: str
    year: int
    plate_number: str
    transmission: str
    seats: int
    price_per_day: Decimal
    image_url: Optional[str] = None

class VehicleUpdate(BaseModel):
    brand: Optional[str] = None
    model: Optional[str] = None
    year: Optional[int] = None
    transmission: Optional[str] = None
    seats: Optional[int] = None
    price_per_day: Optional[Decimal] = None
    image_url: Optional[str] = None
    status: Optional[str] = None

class VehicleOut(BaseModel):
    id: str
    owner_id: str
    vehicle_type: str
    brand: str
    model: str
    year: int
    plate_number: str
    transmission: str
    seats: int
    price_per_day: Decimal
    image_url: Optional[str]
    status: str

    class Config:
        from_attributes = True