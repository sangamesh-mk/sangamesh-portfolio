from fastapi import APIRouter, Depends, HTTPException

from app.core.config import Settings, get_settings
from app.core.knowledge import PROFILE, PROJECTS, SKILLS
from app.schemas.common import ChatData, ChatRequest, ContactData, ContactRequest, Envelope, HealthData
from app.services.chat import generate_reply
from app.services.contact import handle_contact

router = APIRouter()


@router.get("/health", response_model=Envelope[HealthData])
async def health(settings: Settings = Depends(get_settings)) -> Envelope[HealthData]:
    return Envelope(data=HealthData(status="ok", environment=settings.environment))


@router.get("/profile")
async def profile() -> Envelope[dict]:
    return Envelope(data=PROFILE)


@router.get("/projects")
async def projects() -> Envelope[list]:
    return Envelope(data=PROJECTS)


@router.get("/skills")
async def skills() -> Envelope[list]:
    return Envelope(data=SKILLS)


@router.post("/chat", response_model=Envelope[ChatData])
async def chat(payload: ChatRequest, settings: Settings = Depends(get_settings)) -> Envelope[ChatData]:
    reply, mode, provider = await generate_reply(payload.message, settings)
    return Envelope(data=ChatData(reply=reply, mode=mode, provider=provider))


@router.post("/contact", response_model=Envelope[ContactData])
async def contact(payload: ContactRequest, settings: Settings = Depends(get_settings)) -> Envelope[ContactData]:
    if "@" not in payload.email or "." not in payload.email:
        raise HTTPException(status_code=422, detail="Enter a valid email address.")
    result = handle_contact(payload.name, payload.email, payload.message, payload.website, settings)
    return Envelope(data=ContactData(**result))
