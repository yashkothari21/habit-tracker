from fastapi import HTTPException

from api.schemas import HabitHistory, HabitUpdate
from src.core.models import Habit, HabitProgress
from src.api.schemas import HabitCreate, HabitProgressCreate


async def list_habits():
    return await Habit.all()

async def list_habit(habit_id: int):
    return await Habit.get(id=habit_id)

async def update_habit(habit_id: int, habit_update: HabitUpdate):
    habit = await Habit.filter(id=habit_id).first()
    if not habit:
        raise HTTPException(status_code=404, detail="Habit not found")

    if habit_update.name is not None:
        habit.name = habit_update.name
    if habit_update.description is not None:
        habit.description = habit_update.description

    await habit.save()
    return await Habit.get(id=habit_id)

async def view_habit_history():
    habits = await Habit.all().prefetch_related('progress')
    return [
        HabitHistory(
            id=habit.id,
            name=habit.name,
            description=habit.description,
            created_at=habit.created_at,
            progress=[
                HabitProgress(
                    id=progress.id,
                    habit_id=progress.habit_id,
                    date=progress.date,
                    status=progress.status,
                )
                for progress in habit.progress
            ],
        )
        for habit in habits
    ]


async def add_habit(habit: HabitCreate):
    habit_obj = await Habit.create(**habit.dict())
    return habit_obj


async def delete_habit(habit_id: int):
    habit_obj = await Habit.get(id=habit_id)
    await habit_obj.delete()
    return habit_obj


async def update_habit_progress(habit_id: int, progress: HabitProgressCreate):
    habit = await Habit.filter(id=habit_id).first()
    if not habit:
        raise HTTPException(status_code=404, detail="Habit not found")

    progress_obj = await HabitProgress.create(habit=habit, **progress.dict())
    return progress_obj


async def view_habit_progress(habit_id: int):
    habit = await Habit.filter(id=habit_id).first()
    if not habit:
        raise HTTPException(status_code=404, detail="Habit not found")

    return await HabitProgress.filter(habit=habit).all()
