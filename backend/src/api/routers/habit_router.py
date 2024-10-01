from fastapi import APIRouter, HTTPException
from src.api import views, schemas

router = APIRouter()

@router.get("/habits", response_model=list[schemas.Habit])
async def list_habits():
    return await views.list_habits()

@router.get("/habit/{habit_id}", response_model=schemas.Habit)
async def list_habit(habit_id: int):
    return await views.list_habit(habit_id)

@router.put("/habit/{habit_id}", response_model=schemas.Habit)
async def update_habit(habit_id: int, data: schemas.HabitUpdate):
    return await views.update_habit(habit_id, habit_update=data)

@router.delete("/habit/{habit_id}", response_model=schemas.Habit)
async def delete_habit(habit_id: int):
    return await views.delete_habit(habit_id)

@router.post("/habit", response_model=schemas.Habit)
async def add_habit(habit: schemas.HabitCreate):
    return await views.add_habit(habit)

@router.put("/habit/{habit_id}/progress", response_model=schemas.HabitProgress)
async def update_habit_progress(habit_id: int, progress: schemas.HabitProgressCreate):
    return await views.update_habit_progress(habit_id, progress)

@router.get("/habit/{habit_id}/progress", response_model=list[schemas.HabitProgress])
async def view_habit_progress(habit_id: int):
    return await views.view_habit_progress(habit_id)


@router.get("/habits/history", response_model=list[schemas.HabitHistory])
async def view_habit_history():
    return await views.view_habit_history()