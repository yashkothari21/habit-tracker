from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.api.routers import habit_router
from src.core.db import init_db, init, close

app = FastAPI()

origins = [
    "*",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize the database and Aerich for migrations
init_db(app)

@app.on_event("startup")
async def startup_event():
    await init()

@app.on_event("shutdown")
async def shutdown_event():
    await close()

app.include_router(habit_router.router, prefix="/api/v1")
