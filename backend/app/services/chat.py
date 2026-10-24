from __future__ import annotations

import logging

import httpx

from app.core.config import Settings
from app.core.knowledge import JOURNEY, PROFILE, PROJECTS, SKILLS, knowledge_prompt

logger = logging.getLogger("portfolio.chat")


def _local_reply(message: str) -> str:
    text = message.lower()
    if "connect campus" in text:
        project = next(item for item in PROJECTS if item["slug"] == "connect-campus")
        return f"{project['overview']} Implemented screens include: {', '.join(project['implemented'])}. Production deployment is not claimed."
    if "aura" in text:
        project = next(item for item in PROJECTS if item["slug"] == "aura")
        return f"{project['overview']} This is an AI-agent project under development, not a production agent."
    if "jarvis" in text:
        project = next(item for item in PROJECTS if item["slug"] == "jarvis")
        return f"{project['overview']} Planned capabilities should not be treated as finished features."
    if "alert" in text or "band" in text:
        project = next(item for item in PROJECTS if item["slug"] == "alertxband")
        return project["overview"]
    if "github" in text:
        return f"His public GitHub profile is {PROFILE['github']}."
    if "technolog" in text or "skill" in text:
        names = [item["name"] for group in SKILLS for item in group["items"]]
        return "Configured technologies include: " + ", ".join(names) + ". These are learning and project labels, not mastery claims."
    if "journey" in text or "timeline" in text:
        return " ".join(JOURNEY)
    if "sangamesh" in text or "about" in text or "who" in text:
        return " ".join(PROFILE["about"])
    return (
        "I can talk about Sangamesh’s student background, Connect Campus, JARVIS, AURA, AlertXBand, "
        "configured skills, and GitHub. I do not have information beyond the public portfolio notes."
    )


async def generate_reply(message: str, settings: Settings) -> tuple[str, str, str | None]:
    if not settings.gemini_api_key:
        return _local_reply(message), "demo", None

    url = (
        "https://generativelanguage.googleapis.com/v1beta/models/"
        f"{settings.gemini_model}:generateContent"
    )
    payload = {
        "system_instruction": {"parts": [{"text": knowledge_prompt()}]},
        "contents": [{"role": "user", "parts": [{"text": message}]}],
        "generationConfig": {"temperature": 0.3, "maxOutputTokens": 400},
    }
    try:
        async with httpx.AsyncClient(timeout=settings.request_timeout_seconds) as client:
            response = await client.post(url, params={"key": settings.gemini_api_key}, json=payload)
            response.raise_for_status()
            data = response.json()
            text = data["candidates"][0]["content"]["parts"][0]["text"]
            return text.strip(), "llm", "gemini"
    except Exception:
        logger.exception("Gemini provider failed; falling back to demo reply")
        return (
            "The configured model provider failed. Local demo answer: " + _local_reply(message),
            "demo",
            "gemini-error",
        )
