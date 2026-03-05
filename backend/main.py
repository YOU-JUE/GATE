"""
宥爵智能科技 — 公司官網後端
YouJue Intelligent Technology Co., Ltd.

基於 YJ-標準架構01 的 FastAPI 後端
"""
import os
import logging
from datetime import datetime, timezone
from contextlib import asynccontextmanager

from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

# Import routers
from routers import health, contact

# Logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Sentry (optional)
SENTRY_DSN = os.getenv("SENTRY_DSN")
if SENTRY_DSN:
    try:
        import sentry_sdk
        sentry_sdk.init(
            dsn=SENTRY_DSN,
            traces_sample_rate=0.2,
            profiles_sample_rate=0.1,
            send_default_pii=False,
            environment=os.getenv("ENVIRONMENT", "production"),
        )
        logger.info("Sentry initialized")
    except ImportError:
        logger.warning("sentry-sdk not installed, skipping Sentry init")


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan handler."""
    logger.info("=== YouJue Website Backend Starting ===")
    logger.info(f"Environment: {os.getenv('ENVIRONMENT', 'production')}")
    yield
    logger.info("=== YouJue Website Backend Shutting Down ===")


# FastAPI app
app = FastAPI(
    title="宥爵智能科技 — 官網 API",
    description="YouJue Intelligent Technology Co., Ltd. Website Backend",
    version="1.0.0",
    lifespan=lifespan,
)

# CORS
ALLOWED_ORIGINS = [
    "https://www.youjue.ai",
    "https://youjue.ai",
    "http://localhost:3000",
    "http://localhost:8080",
    "http://127.0.0.1:3000",
]

# Allow additional origins from env
extra_origins = os.getenv("ALLOWED_ORIGINS", "")
if extra_origins:
    ALLOWED_ORIGINS.extend([o.strip() for o in extra_origins.split(",") if o.strip()])

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Security Headers Middleware
@app.middleware("http")
async def add_security_headers(request: Request, call_next):
    response = await call_next(request)
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["X-XSS-Protection"] = "1; mode=block"
    response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
    response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"
    return response


# Register routers
app.include_router(health.router)
app.include_router(contact.router)


# Root endpoint
@app.get("/")
async def root():
    return {
        "company": "宥爵智能科技有限公司",
        "company_en": "YouJue Intelligent Technology Co., Ltd.",
        "website": "https://www.youjue.ai",
        "api_version": "1.0.0",
        "status": "running",
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
