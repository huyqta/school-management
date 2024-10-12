from typing import Optional
from pydantic import BaseModel
import uuid

# Shared properties for Product
class ProductBase(BaseModel):
    name: str
    description: Optional[str] = None
    price: float

# Properties to receive via API on creation
class ProductCreate(ProductBase):
    category_id: uuid.UUID  # Khóa ngoại bắt buộc khi tạo sản phẩm

# Properties to receive via API on update
class ProductUpdate(ProductBase):
    category_id: Optional[uuid.UUID] = None  # Có thể cập nhật danh mục

# Properties to return to client
class ProductResponse(ProductBase):
    id: uuid.UUID
    category_id: uuid.UUID

    class Config:
        orm_mode = True
