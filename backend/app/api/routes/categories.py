from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import uuid

from app.api.deps import CurrentUser
from app.schemas.category import CategoryCreate, CategoryUpdate, CategoryResponse
from app.cruds import category as crud_category
from app.api import deps  # Đảm bảo bạn có phụ thuộc đúng

router = APIRouter(
    dependencies=[Depends(CurrentUser)]
)

@router.get("/", response_model=List[CategoryResponse])
def read_categories(skip: int = 0, limit: int = 10, db: Session = Depends(deps.get_db)):
    categories = crud_category.get_categories(db, skip=skip, limit=limit)
    return categories

@router.get("/{category_id}", response_model=CategoryResponse)
def read_category(category_id: uuid.UUID, db: Session = Depends(deps.get_db)):
    category = crud_category.get_category(db, category_id)
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    return category

@router.post("/", response_model=CategoryResponse)
def create_category(category_in: CategoryCreate, db: Session = Depends(deps.get_db)):
    category = crud_category.create_category(db, category_in)
    return category

@router.put("/{category_id}", response_model=CategoryResponse)
def update_category(category_id: uuid.UUID, category_in: CategoryUpdate, db: Session = Depends(deps.get_db)):
    db_category = crud_category.get_category(db, category_id)
    if not db_category:
        raise HTTPException(status_code=404, detail="Category not found")
    category = crud_category.update_category(db, db_category, category_in)
    return category

@router.delete("/{category_id}", response_model=CategoryResponse)
def delete_category(category_id: uuid.UUID, db: Session = Depends(deps.get_db)):
    category = crud_category.delete_category(db, category_id)
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    return category
