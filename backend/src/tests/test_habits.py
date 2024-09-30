import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

@pytest.fixture
def create_habit():
    habit_data = {"name": "Test Habit", "description": "Test Description"}
    response = client.post("/api/habits", json=habit_data)
    return response.json()

def test_add_habit(create_habit):
    response = create_habit
    assert response["name"] == "Test Habit"
    assert response["description"] == "Test Description"

def test_list_habits():
    response = client.get("/api/habits")
    assert response.status_code == 200
    assert isinstance(response.json(), list)
