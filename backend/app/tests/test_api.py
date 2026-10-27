from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_health():
    response = client.get("/api/health")
    assert response.status_code == 200
    body = response.json()
    assert body["ok"] is True
    assert body["data"]["status"] == "ok"


def test_profile_contains_verified_name():
    response = client.get("/api/profile")
    assert response.status_code == 200
    assert response.json()["data"]["name"] == "Sangamesh M Kuri"
    assert "email" not in response.json()["data"] or not response.json()["data"].get("email")


def test_projects_and_skills():
    projects = client.get("/api/projects")
    skills = client.get("/api/skills")
    assert projects.status_code == 200
    assert skills.status_code == 200
    names = [item["name"] for item in projects.json()["data"]]
    assert "Connect Campus" in names
    assert "AURA" in names


def test_chat_demo_mode():
    response = client.post("/api/chat", json={"message": "Tell me about Sangamesh."})
    assert response.status_code == 200
    data = response.json()["data"]
    assert data["mode"] == "demo"
    assert "Sangamesh" in data["reply"]


def test_chat_rejects_empty():
    response = client.post("/api/chat", json={"message": ""})
    assert response.status_code == 422


def test_contact_honeypot_is_silent():
    response = client.post(
        "/api/contact",
        json={"name": "Bot", "email": "bot@example.com", "message": "Hello from a visitor.", "website": "https://spam.test"},
    )
    assert response.status_code == 200
    assert response.json()["data"]["delivery"] == "none"


def test_contact_demo_does_not_claim_email():
    response = client.post(
        "/api/contact",
        json={"name": "Ada", "email": "ada@example.com", "message": "Hello from a visitor."},
    )
    assert response.status_code == 200
    data = response.json()["data"]
    assert data["delivery"] == "none"
    assert "No email was sent" in data["message"]
