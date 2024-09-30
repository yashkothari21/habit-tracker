from tortoise import fields, models
from tortoise.contrib.pydantic import pydantic_model_creator
from datetime import date

class Habit(models.Model):
    id = fields.IntField(pk=True)
    name = fields.CharField(max_length=255)
    description = fields.TextField()
    created_at = fields.DatetimeField(auto_now_add=True)

class HabitProgress(models.Model):
    id = fields.IntField(pk=True)
    habit = fields.ForeignKeyField('models.Habit', related_name='progress')
    date = fields.DateField(default=date.today)
    status = fields.BooleanField()

# Models for serialization
Habit_Pydantic = pydantic_model_creator(Habit)
HabitProgress_Pydantic = pydantic_model_creator(HabitProgress)
