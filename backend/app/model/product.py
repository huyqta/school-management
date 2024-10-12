from sqlmodel import SQLModel, Field, Relationship
from typing import Optional
import uuid
from .entity import EntityBase
# from .category import Category

class Product(EntityBase, table=True):
    name: str
    price: float
    description: Optional[str] = Field(default=None, max_length=255)
    category_id: uuid.UUID = Field(foreign_key="category.id")
    category: Optional["Category"] = Relationship(back_populates="products")
