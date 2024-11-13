from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import uuid

from app.api.deps import CurrentUser
from app.schemas.student import StudentCreate, StudentUpdate, StudentResponse
from app.cruds import student as crud_student
from app.api import deps  # Đảm bảo bạn có phụ thuộc đúng
from app.api.deps import (
    CurrentUser,
    SessionDep,
)

router = APIRouter(
    # dependencies=[Depends(CurrentUser)]
)

@router.get("/", response_model=List[StudentResponse])
def read_students(skip: int = 0, limit: int = 10, db: Session = Depends(deps.get_db)):
    students = crud_student.get_students(db, skip=skip, limit=limit)
    return students

@router.get("/{student_id}", response_model=StudentResponse)
def read_student(student_id: uuid.UUID, db: Session = Depends(deps.get_db)):
    student = crud_student.get_student(db, student_id)
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    return student

# @router.get("/me", response_model=StudentResponse)
# def read_my_student(
#     *,
#     ession: SessionDep, 
#     current_user: CurrentUser
# ):
#     student = crud_student.get_student_by_user_id(ession, current_user.id)
#     if not student:
#         raise HTTPException(status_code=404, detail="Student not found")
#     return student

@router.post("/", response_model=StudentResponse)
def create_student(student_in: StudentCreate, session: SessionDep):
    student = crud_student.create_student(session = session, student = student_in)
    return student

@router.put("/{student_id}", response_model=StudentResponse)
def update_student(student_id: uuid.UUID, student_in: StudentUpdate, session: SessionDep):
    db_student = crud_student.get_student(session, student_id)
    if not db_student:
        raise HTTPException(status_code=404, detail="Student not found")
    student = crud_student.update_student(session, db_student, student_in)
    return student


@router.put("/{section}/{student_id}", response_model=StudentResponse)
def update_student_section(student_id: uuid.UUID, student_in: StudentUpdate, session: SessionDep):
    db_student = crud_student.get_student(session, student_id)
    if not db_student:
        raise HTTPException(status_code=404, detail="Student not found")
    student = crud_student.update_student(session, db_student, student_in)
    return student

# @router.delete("/{student_id}", response_model=StudentResponse)
# def delete_student(student_id: uuid.UUID, db: Session = Depends(deps.get_db)):
#     student = crud_student.delete_student(db, student_id)
#     if not student:
#         raise HTTPException(status_code=404, detail="Student not found")
#     return student