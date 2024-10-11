from fastapi import APIRouter, HTTPException

router = APIRouter()

@router.get("/")
async def get_all_students():
    return {"message": "Hello new student"}


@router.post("/")
async def create_student():
    return {"message": "Hello new student"}