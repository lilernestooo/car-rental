from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.api.deps import get_current_admin
from app.models.user import User
from app.schemas.user import UserOut

router = APIRouter(prefix="/users", tags=["Admin - Users"])

@router.get("/", response_model=List[UserOut])
def list_users(db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    return db.query(User).order_by(User.created_at.desc()).all()