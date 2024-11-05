from sqlmodel import SQLModel, Field, Relationship
from typing import Optional
import uuid
from .entity import EntityBase


class Product(EntityBase, table=True):
    name: str
    price: float
    unit: str
    description: Optional[str] = Field(default=None, max_length=255)
    category_id: uuid.UUID = Field(foreign_key="category.id")
    category: Optional["Category"] = Relationship(back_populates="products")
