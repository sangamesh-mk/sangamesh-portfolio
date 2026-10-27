from typing import Generic, TypeVar

from pydantic import BaseModel, Field

T = TypeVar("T")


class Envelope(BaseModel, Generic[T]):
    ok: bool = True
    data: T
    error: str | None = None


class HealthData(BaseModel):
    status: str = "ok"
    environment: str


class ChatRequest(BaseModel):
    message: str = Field(min_length=1, max_length=2000)


class ChatData(BaseModel):
    reply: str
    mode: str
    provider: str | None = None


class ContactRequest(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    email: str = Field(min_length=3, max_length=200)
    message: str = Field(min_length=8, max_length=4000)
    website: str | None = Field(default="", max_length=200)


class ContactData(BaseModel):
    accepted: bool
    delivery: str
    message: str
    mailto: str | None = None
