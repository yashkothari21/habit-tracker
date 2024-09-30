from fastapi import APIRouter, HTTPException
from api import views, schemas

router = APIRouter()

@router.get("/habits", response_model=list[schemas.Habit])
async def list_habits():
    return await views.list_habits()

@router.post("/habits", response_model=schemas.Habit)
async def add_habit(habit: schemas.HabitCreate):
    return await views.add_habit(habit)

@router.post("/habits/{habit_id}/progress", response_model=schemas.HabitProgress)
async def update_habit_progress(habit_id: int, progress: schemas.HabitProgressCreate):
    return await views.update_habit_progress(habit_id, progress)

@router.get("/habits/{habit_id}/history", response_model=list[schemas.HabitProgress])
async def view_habit_history(habit_id: int):
    return await views.view_habit_history(habit_id)
