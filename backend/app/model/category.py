from sqlmodel import Relationship, SQLModel, Field
from typing import Optional, List
import uuid
from .entity import EntityBase
# from .product import Product

class Category(EntityBase, table=True):
    name: str
    description: Optional[str] = Field(default=None, max_length=255)
    products: List["Product"] = Relationship(back_populates="category")
