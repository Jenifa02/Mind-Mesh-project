from fastapi import FastAPI
from app.routes.user import router as users_router
from app.config.settings import settings
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title=settings.app_name)


# CORS config
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Users router
app.include_router(users_router)


@app.get("/")
def home():
    return {"msg": "backend start"}


@app.get("/ping")
def ping():
    return {
        "status": "success",
        "message": "Hello from FastAPI!",
    }


@app.get("/health")
def health():
    return {
        "status": "healthy",
    }