from typing import Optional, List
from pydantic import BaseModel
import uuid

from app.schemas.product import ProductResponse

# Shared properties for Category
class CategoryBase(BaseModel):
    name: str
    description: Optional[str] = None

# Properties to receive via API on creation
class CategoryCreate(CategoryBase):
    pass

# Properties to receive via API on update
class CategoryUpdate(CategoryBase):
    pass

# Properties to return to client
class CategoryResponse(CategoryBase):
    id: uuid.UUID
    products: Optional[List[ProductResponse]] = None  # Giả sử bạn có model Product

    class Config:
        orm_mode = True  # Cho phép sử dụng với ORM (SQLAlchemy)
