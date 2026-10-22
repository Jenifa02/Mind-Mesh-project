
from fastapi.testclient import TestClient  # pyright: ignore[reportMissingImports]
from app.main import app

client = TestClient(app)


def test_home():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"msg": "backend start"}


def test_ping():
    response = client.get("/ping")
    assert response.status_code == 200
    assert response.json() == {
        "status": "success",
        "message": "Hello from FastAPI!",
    }


def test_health():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "healthy"}
