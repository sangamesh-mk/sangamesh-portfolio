import logging
from collections.abc import AsyncIterator
from contextlib import asynccontextmanager

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from slowapi.middleware import SlowAPIMiddleware
from starlette.middleware.base import BaseHTTPMiddleware

from app.api.routes import router
from app.core.config import get_settings
from app.core.limiter import limiter

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(name)s %(message)s")
logger = logging.getLogger("portfolio")

settings = get_settings()


class LimitRequestSize(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        content_length = request.headers.get("content-length")
        if content_length and int(content_length) > 32_000:
            return JSONResponse({"ok": False, "data": None, "error": "Payload too large."}, status_code=413)
        return await call_next(request)


@asynccontextmanager
async def lifespan(_: FastAPI) -> AsyncIterator[None]:
    logger.info("API starting in %s", settings.environment)
    yield


app = FastAPI(title=settings.app_name, lifespan=lifespan, docs_url="/docs")
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)
app.add_middleware(SlowAPIMiddleware)
app.add_middleware(LimitRequestSize)
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.origin_list or ["http://127.0.0.1:5173"],
    allow_credentials=False,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type"],
)
app.include_router(router, prefix="/api")


@app.exception_handler(Exception)
async def unhandled(_: Request, __: Exception):
    logger.exception("Unhandled error")
    return JSONResponse({"ok": False, "data": None, "error": "Internal error."}, status_code=500)
