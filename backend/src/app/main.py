from fastapi import FastAPI
from src.api.routers import habit_router
from src.core.db import init_db, init, close

app = FastAPI()

# Initialize the database and Aerich for migrations
init_db(app)

@app.on_event("startup")
async def startup_event():
    await init()

@app.on_event("shutdown")
async def shutdown_event():
    await close()

app.include_router(habit_router.router, prefix="/api/v1")
