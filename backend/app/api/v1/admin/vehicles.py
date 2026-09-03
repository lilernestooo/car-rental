from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.api.deps import get_current_admin
from app.models.vehicle import Vehicle
from app.schemas.vehicle import VehicleOut

router = APIRouter(prefix="/vehicles", tags=["Admin - Vehicles"])

@router.get("/", response_model=List[VehicleOut])
def list_vehicles(status: str | None = None, db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    q = db.query(Vehicle)
    if status:
        q = q.filter(Vehicle.status == status)
    return q.order_by(Vehicle.created_at.desc()).all()

@router.patch("/{vehicle_id}/approve", response_model=VehicleOut)
def approve_vehicle(vehicle_id: str, db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    vehicle = db.query(Vehicle).filter(Vehicle.id == vehicle_id).first()
    if not vehicle:
        raise HTTPException(status_code=404, detail="Vehicle not found")
    vehicle.status = "available"
    db.commit()
    db.refresh(vehicle)
    return vehicle

@router.patch("/{vehicle_id}/reject", response_model=VehicleOut)
def reject_vehicle(vehicle_id: str, db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    vehicle = db.query(Vehicle).filter(Vehicle.id == vehicle_id).first()
    if not vehicle:
        raise HTTPException(status_code=404, detail="Vehicle not found")
    vehicle.status = "rejected"
    db.commit()
    db.refresh(vehicle)
    return vehicle