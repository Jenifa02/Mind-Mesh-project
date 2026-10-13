
from fastapi import APIRouter
from app.models.project import ProjectCreate

router = APIRouter(prefix="/projects", tags=["Projects"])


@router.post("/")
async def validate_project(project: ProjectCreate):
    return {
        "message": "Project data validated successfully",
        "title": project.title,
        "description": project.description
    }




# from fastapi import APIRouter, Depends, HTTPException
# from app.models.project import ProjectCreate
# from app.dependencies.auth import get_current_user
# from app.config.settings import settings
# from supabase import create_client, Client

# router = APIRouter(prefix="/projects", tags=["Projects"])


# def get_supabase() -> Client:
#     return create_client(
#         settings.SUPABASE_URL,
#         settings.SUPABASE_SERVICE_ROLE_KEY
#     )


# @router.post("/")
# async def create_project(
#     project: ProjectCreate,
#     current_user=Depends(get_current_user)
# ):
#     supabase = get_supabase()

#     data = {
#         "title": project.title,
#         "description": project.description,
#         "user_id": current_user["sub"]
#     }

#     try:
#         result = supabase.table("projects").insert(data).execute()
#         return {
#             "message": "Project created successfully",
#             "project": result.data[0]
#         }
#     except Exception:
#         raise HTTPException(
#             status_code=400,
#             detail="Unable to create project"
#         )
