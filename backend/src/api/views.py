from fastapi import HTTPException
from src.core.models import Habit, HabitProgress
from src.api.schemas import HabitCreate, HabitProgressCreate


async def list_habits():
    return await Habit.all()


async def add_habit(habit: HabitCreate):
    habit_obj = await Habit.create(**habit.dict())
    return habit_obj


async def update_habit_progress(habit_id: int, progress: HabitProgressCreate):
    habit = await Habit.filter(id=habit_id).first()
    if not habit:
        raise HTTPException(status_code=404, detail="Habit not found")

    progress_obj = await HabitProgress.create(habit=habit, **progress.dict())
    return progress_obj


async def view_habit_history(habit_id: int):
    habit = await Habit.filter(id=habit_id).first()
    if not habit:
        raise HTTPException(status_code=404, detail="Habit not found")

    return await HabitProgress.filter(habit=habit).all()
