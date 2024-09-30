from tortoise import Tortoise
from tortoise.contrib.fastapi import register_tortoise

from src.app.config import DATABASE_URL

TORTOISE_ORM = {
    "connections": {
        "default": DATABASE_URL,
    },
    "apps": {
        "models": {
            "models": ["src.core.models", "aerich.models"],  # Include Aerich models
            "default_connection": "default",
        },
    },
}

# Function to initialize the database with FastAPI
def init_db(app):
    register_tortoise(
        app,
        db_url=DATABASE_URL,
        modules={"models": ["src.core.models"]},
        generate_schemas=False,
        add_exception_handlers=True,
    )

async def init():
    await Tortoise.init(config=TORTOISE_ORM)


async def close():
    await Tortoise.close_connections()