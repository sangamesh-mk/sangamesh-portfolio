from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    app_name: str = "sangamesh-portfolio-api"
    environment: str = "development"
    cors_origins: str = "http://127.0.0.1:5173,http://localhost:5173"
    gemini_api_key: str | None = None
    gemini_model: str = "gemini-2.0-flash"
    contact_email: str | None = None
    request_timeout_seconds: float = 20
    rate_limit: str = "30/minute"

    @property
    def origin_list(self) -> list[str]:
        return [origin.strip() for origin in self.cors_origins.split(",") if origin.strip()]


@lru_cache
def get_settings() -> Settings:
    return Settings()
