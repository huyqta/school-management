from sqlalchemy.orm import Session
from app.model.product import Product
from app.schemas.product import ProductCreate, ProductUpdate
import uuid

def get_product(db: Session, product_id: uuid.UUID):
    return db.query(Product).filter(Product.id == product_id).first()

def get_products(db: Session, skip: int = 0, limit: int = 10):
    return db.query(Product).offset(skip).limit(limit).all()

def create_product(db: Session, product_in: ProductCreate):
    db_product = Product(**product_in.dict())
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product

def update_product(db: Session, db_product: Product, product_update: ProductUpdate):
    for var, value in vars(product_update).items():
        setattr(db_product, var, value) if value else None
    db.commit()
    db.refresh(db_product)
    return db_product

def delete_product(db: Session, product_id: uuid.UUID):
    product = db.query(Product).filter(Product.id == product_id).first()
    if product:
        db.delete(product)
        db.commit()
    return product
