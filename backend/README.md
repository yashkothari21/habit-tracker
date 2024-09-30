# Backend - Habit Tracker Application

## Project Overview

This is the backend for the **Habit Tracker Application**, a FastAPI-based API that allows users to track their daily habits. Users can add habits, update their progress, and view their tracking history. The application uses SQLite as the database and Tortoise ORM for database interactions.

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
    │   ├── dependencies.py
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
    ├── tests/
    │   ├── __init__.py
    │   └── test_habits.py
    └── db.sqlite3
```

### Explanation of Key Directories:
- `api`: Contains the business logic of the application (routers, schemas, views).
- `app`: Contains project-wide settings and the main entry point for the FastAPI application.
- `core`: Contains the database configuration and models.
- `tests`: Contains unit tests for the application.

## Setup and Installation

### Prerequisites

Make sure you have **Python 3.x** and **Docker** installed on your machine.

### Steps:

1. **Clone the Repository:**

   ```bash
   git clone <repository-url>
   cd backend
   ```

2. **Install Dependencies:**

   ```bash
   pip install -r requirements.txt
   ```

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
   The API will be available at `http://localhost:8000`.

### Option 2: Local Development

1. **Run the FastAPI Development Server:**

   ```bash
   python src/app/main.py
   ```

2. **Access the API:**
   The API will be available at `http://127.0.0.1:8000`.

## Available Endpoints

- **GET /api/habits** - Retrieve all habits.
- **POST /api/habits** - Add a new habit.
- **POST /api/habits/{habit_id}/progress** - Update the progress of a specific habit.
- **GET /api/habits/{habit_id}/history** - View the tracking history of a specific habit.

## Configuration

### Environment Variables

- **DATABASE_URL**: Default is `sqlite://db.sqlite3` (SQLite).

### Additional Notes

- You can modify the database settings in the `src/app/config.py` file to switch to other databases like PostgreSQL or MySQL for production.

## Troubleshooting

- **ModuleNotFoundError**: Ensure that you are in the correct virtual environment or container and that all dependencies are installed.

## Running Tests

To ensure the application works as expected, you can run the tests using `pytest`. The tests are located in the `src/tests/test_habits.py` file.

### Run Tests:

```bash
pytest src/tests/
```

### Example Test Cases

The `test_habits.py` includes the following test cases:

- **test_add_habit**: Verifies that a new habit can be added successfully.
- **test_list_habits**: Checks if the list of habits is retrievable.
