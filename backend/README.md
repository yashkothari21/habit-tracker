# Backend - Habit Tracker Application

## Project Overview

This is the backend for the **Habit Tracker Application**, a FastAPI-based API that allows users to track their daily habits. Users can add habits, update their progress, and view their tracking history. The application uses SQLite as the database and Tortoise ORM for database interactions, with Aerich for managing database migrations.

## Project Structure

```
backend/
├── Dockerfile
├── README.md
├── requirements.txt
└── src/
    ├── api/
    │   ├── __init__.py
    │   ├── routers/
    │   │   ├── __init__.py
    │   │   └── habit_router.py
    │   ├── schemas.py
    │   └── views.py
    ├── app/
    │   ├── __init__.py
    │   ├── config.py
    │   └── main.py
    ├── core/
    │   ├── __init__.py
    │   ├── db.py
    │   └── models.py
    ├── migrations/
    ├── tests/
    │   ├── __init__.py
    │   └── test_habits.py
    └── db.sqlite3
```

### Explanation of Key Directories:
- **`api/`**: Contains the business logic of the application (routers, schemas, views).
- **`app/`**: Contains project-wide settings and the main entry point for the FastAPI application.
- **`core/`**: Contains the database configuration and models.
- **`migrations/`**: Stores migration scripts managed by Aerich.
- **`tests/`**: Contains unit tests for the application.

## Setup and Installation

### Prerequisites

Make sure you have **Python 3.x**, **Docker**, and **Aerich** installed on your machine.

### Steps:

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/yashkothari21/habit-tracker
   cd backend
   ```

2. **Install Dependencies:**

   ```bash
   pip install -r requirements.txt
   ```

3. **Configure Environment Variables:**

   Create a `.env` file in the root directory and copy contant from .env-example file.

## Running the Application

### Option 1: Using Docker

1. **Build Docker Image:**

   ```bash
   docker build -t backend .
   ```

2. **Run the Application in Docker:**

   ```bash
   docker run -p 8000:8000 backend
   ```

3. **Access the API:**
   The API will be available at `http://localhost:8000/api/v1`.

### Option 2: Local Development

1. **Run the FastAPI Development Server:**

   ```bash
   uvicorn src.app.main:app --reload
   ```

2. **Access the API:**
   The API will be available at `http://127.0.0.1:8000/api/v1`.

## Database Migrations with Aerich

1. **Initialize Aerich:**

   ```bash
   aerich init -t src.core.db.TORTOISE_ORM
   ```

2. **Generate Initial Migration:**

   ```bash
   aerich init-db
   ```

3. **Apply Migrations:**

   ```bash
   aerich upgrade
   ```

4. **Make Migrations After Model Changes:**

   If you change your models and need to generate new migrations:

   ```bash
   aerich migrate
   ```

5. **Apply New Migrations:**

   ```bash
   aerich upgrade
   ```

## Available Endpoints

- **GET /api/habits** - Retrieve all habits.
- **POST /api/habits** - Add a new habit.
- **POST /api/habits/{habit_id}/progress** - Update the progress of a specific habit.
- **GET /api/habits/{habit_id}/history** - View the tracking history of a specific habit.

## Configuration

### Environment Variables

- **DATABASE_URL**: Default is `sqlite://db.sqlite3` (SQLite). Modify in `.env` for different environments.

### Additional Notes

- You can switch to other databases like PostgreSQL or MySQL for production by modifying the `TORTOISE_ORM` configuration in `src/core/db.py` and adjusting `DATABASE_URL` accordingly.

## Troubleshooting

- **ModuleNotFoundError**: Ensure that you're in the correct virtual environment or container and that all dependencies are installed.

- **Migration Errors**: If Aerich migrations fail, check if `TORTOISE_ORM` is correctly set in `src/core/db.py` and that Aerich is initialized properly.

## Running Tests

To ensure the application works as expected, run tests using `pytest`. The tests are located in `src/tests/test_habits.py`.

### Run Tests:

```bash
pytest
```

### Example Test Cases

The `test_habits.py` includes the following test cases:

- **test_add_habit**: Test the creation of a new habit.
- **test_list_habits**: Test retrieving the list of all habits.
- **create_habit_progress**: Fixture to create habit progress for an existing habit.
- **test_update_habit_progress**: est updating the progress of a habit.
- **test_view_habit_history**: Test viewing habit progress history.
