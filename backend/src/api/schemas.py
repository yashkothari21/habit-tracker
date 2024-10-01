from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel, ConfigDict
from datetime import date


class HabitCreate(BaseModel):
    name: str
    description: str


class HabitUpdate(BaseModel):
    name: Optional[str]
    description: Optional[str]


class HabitProgress(BaseModel):
    id: int
    habit_id: int
    date: date
    status: bool

    model_config = ConfigDict(from_attributes=True)


class HabitProgressCreate(BaseModel):
    date: date
    status: bool


class Habit(BaseModel):
    id: int
    name: str
    description: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class HabitHistory(BaseModel):
    id: int
    name: str
    description: str
    created_at: datetime
    progress: List[HabitProgress]

    model_config = ConfigDict(from_attributes=True)
