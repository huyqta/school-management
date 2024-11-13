from datetime import datetime
import uuid
from sqlmodel import Field
from typing import Any, Dict, Optional, List
from .entity import EntityBase
from pydantic import Json, BaseModel


class Student(EntityBase, table=True):
    user_id: uuid.UUID = Field(foreign_key="user.id")
    phone: Optional[str]
    address: Optional[str]
    dob: Optional[datetime] = Field(default_factory=datetime.utcnow)
    description: Optional[str] = Field(default=None, max_length=255)
    json_data: Optional[str] = None


class Course(BaseModel):
    course_id: str
    course_name: str
    credits: int
    grade: str


class HighSchool(BaseModel):
    name: str
    graduation_year: int
    gpa: float


class University(BaseModel):
    name: str
    major: str
    degree: str
    graduation_year: int
    gpa: float
    courses: List[Course]


class Education(BaseModel):
    high_school: HighSchool
    university: University


class ExtracurricularActivity(BaseModel):
    activity_name: str
    role: str
    years_active: List[int]


class Certification(BaseModel):
    certification_name: str
    institution: str
    year_issued: int


class StudentProfile(BaseModel):
    education: Education
    skills: List[str]
    extracurricular_activities: List[ExtracurricularActivity]
    certifications: List[Certification]