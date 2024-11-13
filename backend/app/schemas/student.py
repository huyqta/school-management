from datetime import datetime
import uuid
from sqlmodel import Field
from typing import Any, Dict, Optional, List
from pydantic import Json, BaseModel

# Shared properties for Category
class StudentBase(BaseModel):
    user_id: uuid.UUID = Field(foreign_key="user.id")
    phone: Optional[str] = None
    address: Optional[str] = None
    dob: Optional[datetime] = Field(default_factory=datetime.utcnow)
    description: Optional[str] = Field(default=None, max_length=255)
    json_data: Optional[str] = None


class StudentCreate(StudentBase):
    pass



class StudentUpdate(StudentBase):
    pass


class StudentResponse(StudentBase):
    id: uuid.UUID
    
    class Config:
        orm_mode = True  # Cho phép sử dụng với ORM (SQLAlchemy)