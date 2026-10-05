from fastapi import FastAPI
from app.routes.user import router as users_router
from app.config.settings import settings
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title=settings.app_name)

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",


]
# CORS config
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
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