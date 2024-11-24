from app.model.student import StudentProfile
from fastapi import APIRouter, HTTPException
from typing import List
import uuid

from app.schemas.student import StudentCreate, StudentUpdate, StudentResponse
from app.cruds import student as crud_student
from app.api.deps import (
    CurrentUser,
    SessionDep,
)

router = APIRouter()


@router.get("/", response_model=List[StudentResponse])
def read_students(session: SessionDep, skip: int = 0, limit: int = 10):
    students = crud_student.get_students(session, skip=skip, limit=limit)
    return students


@router.get("/me", response_model=StudentResponse)
def read_my_student(
    session: SessionDep,
    current_user: CurrentUser
):
    print(current_user.id)
    student = crud_student.get_student_by_user_id(session, current_user.id)
    if not student:
        student = create_default_student(session, current_user)
    return student


@router.get("/{student_id}", response_model=StudentResponse)
def read_student(
    student_id: uuid.UUID,
    session: SessionDep,
    current_user: CurrentUser
):
    student = crud_student.get_student(session, student_id)
    if not student:
        student = create_default_student(session, current_user)
    return student


@router.post("/", response_model=StudentResponse)
def create_student(student_in: StudentCreate, session: SessionDep):
    student = crud_student.create_student(session=session, student=student_in)
    return student


@router.put("/{student_id}", response_model=StudentResponse)
def update_student(
    student_id: uuid.UUID,
    student_in: StudentUpdate,
    session: SessionDep
):
    print(student_id)
    print(student_in.json_data)
    db_student = crud_student.get_student(session, student_id)
    if not db_student:
        raise HTTPException(status_code=404, detail="Student not found")
    student = crud_student.update_student(session, db_student, student_in)
    return student


@router.put("/{section}/{student_id}", response_model=StudentResponse)
def update_student_section(
    student_id: uuid.UUID,
    student_in: StudentUpdate,
    session: SessionDep
):
    db_student = crud_student.get_student(session, student_id)
    if not db_student:
        raise HTTPException(status_code=404, detail="Student not found")
    student = crud_student.update_student(session, db_student, student_in)
    return student


def create_default_student(
    session: SessionDep,
    current_user: CurrentUser
):
    default_profile = StudentProfile()
    json_data_str = default_profile.json()
    student_in = StudentCreate(
        user_id=current_user.id,
        json_data=json_data_str  # JSON rỗng
    )
    return crud_student.create_student(session=session, student=student_in)
