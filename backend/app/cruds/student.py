import uuid
from sqlalchemy.orm import Session
from app.model.student import Student
from app.schemas.student import StudentCreate, StudentUpdate


def get_student(session: Session, student_id: uuid.UUID):
    return session.query(Student).filter(Student.id == student_id).first()


def get_student_by_user_id(session: Session, user_id: uuid.UUID):
    return session.query(Student).filter(Student.user_id == user_id).first()


def create_student(*, session: Session, student: StudentCreate):
    db_student = Student(**student.dict())
    session.add(db_student)
    session.commit()
    session.refresh(db_student)
    return db_student


def update_student(session: Session, db_student: Student, student_update: StudentUpdate):
    for var, value in vars(student_update).items():
        setattr(db_student, var, value) if value else None
    session.commit()
    session.refresh(db_student)
    return db_student