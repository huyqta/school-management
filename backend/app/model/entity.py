from sqlmodel import SQLModel, Field
import uuid
from datetime import datetime
from typing import Optional

class EntityBase(SQLModel):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    created_at: Optional[datetime] = Field(default_factory=datetime.utcnow)
    updated_at: Optional[datetime] = Field(default_factory=datetime.utcnow)
    created_by: Optional[uuid.UUID] = Field(foreign_key="user.id")
    updated_by: Optional[uuid.UUID] = Field(foreign_key="user.id")