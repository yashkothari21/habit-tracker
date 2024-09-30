from pydantic import BaseModel, ConfigDict
from datetime import date

class HabitCreate(BaseModel):
    name: str
    description: str

class Habit(BaseModel):
    id: int
    name: str
    description: str
    created_at: str

    model_config = ConfigDict(from_attributes=True)

class HabitProgressCreate(BaseModel):
    date: date
    status: bool

class HabitProgress(BaseModel):
    id: int
    habit_id: int
    date: date
    status: bool

    model_config = ConfigDict(from_attributes=True)
