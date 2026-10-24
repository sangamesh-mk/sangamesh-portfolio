from urllib.parse import quote

from app.core.config import Settings
from app.core.knowledge import PROFILE


def handle_contact(name: str, email: str, message: str, website: str | None, settings: Settings) -> dict:
    if website:
        return {
            "accepted": True,
            "delivery": "none",
            "message": "Thanks.",
            "mailto": None,
        }

    destination = settings.contact_email
    if destination:
        subject = quote(f"Portfolio message from {name}")
        body = quote(f"From: {name} <{email}>\n\n{message}")
        return {
            "accepted": True,
            "delivery": "mailto",
            "message": "Email delivery is not configured as an automated send. A mailto draft was prepared instead.",
            "mailto": f"mailto:{destination}?subject={subject}&body={body}",
        }

    github = PROFILE.get("github")
    hint = f" Use GitHub ({github}) if you want to reach Sangamesh publicly." if github else ""
    return {
        "accepted": True,
        "delivery": "none",
        "message": (
            "This form accepted a demo submission only. No email was sent because a delivery provider is not configured."
            + hint
        ),
        "mailto": None,
    }
