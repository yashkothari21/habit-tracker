import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

@pytest.fixture
def create_habit():
    """Fixture to create a new habit for testing."""
    habit_data = {"name": "Test Habit", "description": "Test Description"}
    response = client.post("/api/v1/habits", json=habit_data)
    assert response.status_code == 201
    return response.json()

def test_add_habit(create_habit):
    """Test the creation of a new habit."""
    response = create_habit
    assert response["name"] == "Test Habit"
    assert response["description"] == "Test Description"

def test_list_habits():
    """Test retrieving the list of all habits."""
    response = client.get("/api/v1/habits")
    assert response.status_code == 200
    habits = response.json()
    assert isinstance(habits, list)
    if habits:
        assert "Test Habit" in [habit['name'] for habit in habits]

@pytest.fixture
def create_habit_progress(create_habit):
    """Fixture to create habit progress for an existing habit."""
    habit_id = create_habit["id"]
    progress_data = {"status": True, "date": "2024-09-30"}
    response = client.post(f"/api/v1/habits/{habit_id}/progress", json=progress_data)
    assert response.status_code == 201  # Ensure habit progress was added
    return response.json()

def test_update_habit_progress(create_habit_progress):
    """Test updating the progress of a habit."""
    response = create_habit_progress
    assert response["status"] is True
    assert response["date"] == "2024-09-30"

def test_view_habit_history(create_habit):
    """Test viewing habit progress history."""
    habit_id = create_habit["id"]
    response = client.get(f"/api/v1/habits/{habit_id}/history")
    assert response.status_code == 200
    history = response.json()
    assert isinstance(history, list)
