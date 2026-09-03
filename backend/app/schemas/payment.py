from pydantic import BaseModel
from decimal import Decimal
from datetime import datetime

class PaymentOut(BaseModel):
    id: str
    booking_id: str
    amount: Decimal
    method: str
    status: str
    transaction_ref: str | None
    created_at: datetime

    class Config:
        from_attributes = True