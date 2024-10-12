from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import uuid

from app.schemas.product import ProductCreate, ProductUpdate, ProductResponse
from app.cruds import product as crud_product
from app.api import deps

router = APIRouter()

@router.get("/", response_model=List[ProductResponse])
def read_products(skip: int = 0, limit: int = 10, db: Session = Depends(deps.get_db)):
    products = crud_product.get_products(db, skip=skip, limit=limit)
    return products

@router.get("/{product_id}", response_model=ProductResponse)
def read_product(product_id: uuid.UUID, db: Session = Depends(deps.get_db)):
    product = crud_product.get_product(db, product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@router.post("/", response_model=ProductResponse)
def create_product(product_in: ProductCreate, db: Session = Depends(deps.get_db)):
    product = crud_product.create_product(db, product_in)
    return product

@router.put("/{product_id}", response_model=ProductResponse)
def update_product(product_id: uuid.UUID, product_in: ProductUpdate, db: Session = Depends(deps.get_db)):
    db_product = crud_product.get_product(db, product_id)
    if not db_product:
        raise HTTPException(status_code=404, detail="Product not found")
    product = crud_product.update_product(db, db_product, product_in)
    return product

@router.delete("/{product_id}", response_model=ProductResponse)
def delete_product(product_id: uuid.UUID, db: Session = Depends(deps.get_db)):
    product = crud_product.delete_product(db, product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product
