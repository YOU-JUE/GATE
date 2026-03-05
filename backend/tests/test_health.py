"""Health endpoint tests."""
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


def test_health():
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert data["service"] == "youjue-website"


def test_health_detailed():
    response = client.get("/health/detailed")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert "components" in data


def test_root():
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert data["company"] == "宥爵智能科技有限公司"
    assert data["status"] == "running"


def test_contact_missing_fields():
    response = client.post("/api/contact", json={
        "name": "",
        "email": "test@test.com",
        "subject": "product",
        "message": "test message"
    })
    assert response.status_code == 400


def test_contact_success():
    response = client.post("/api/contact", json={
        "name": "Test User",
        "email": "test@test.com",
        "subject": "product",
        "message": "This is a test message"
    })
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "success"
