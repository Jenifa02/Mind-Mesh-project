from fastapi import FastAPI
from app.routes.user import router as users_router
from app.config.settings import settings

app = FastAPI(title=settings.app_name)
app.include_router(users_router)

@app.get("/")
def home():
    return {"msg": "backend start"}



