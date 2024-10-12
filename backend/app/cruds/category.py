from sqlalchemy.orm import Session
from app.model.category import Category
from app.schemas.category import CategoryCreate, CategoryUpdate
import uuid

def get_category(db: Session, category_id: uuid.UUID):
    return db.query(Category).filter(Category.id == category_id).first()

def get_categories(db: Session, skip: int = 0, limit: int = 10):
    return db.query(Category).offset(skip).limit(limit).all()

def create_category(db: Session, category: CategoryCreate):
    db_category = Category(**category.dict())
    db.add(db_category)
    db.commit()
    db.refresh(db_category)
    return db_category

def update_category(db: Session, db_category: Category, category_update: CategoryUpdate):
    for var, value in vars(category_update).items():
        setattr(db_category, var, value) if value else None
    db.commit()
    db.refresh(db_category)
    return db_category

def delete_category(db: Session, category_id: uuid.UUID):
    category = db.query(Category).filter(Category.id == category_id).first()
    if category:
        db.delete(category)
        db.commit()
    return category
