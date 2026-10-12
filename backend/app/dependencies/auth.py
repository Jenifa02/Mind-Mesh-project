import os

import jwt
from dotenv import load_dotenv
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from jwt import PyJWKClient

load_dotenv()

SUPABASE_URL = os.environ["SUPABASE_URL"]

JWKS_URL = f"{SUPABASE_URL}/auth/v1/.well-known/jwks.json"

_jwks = PyJWKClient(
    JWKS_URL,
    cache_keys=True,
)

_bearer = HTTPBearer()


def get_current_user(
    creds: HTTPAuthorizationCredentials = Depends(_bearer),
) -> dict:

    token = creds.credentials

    try:
        key = _jwks.get_signing_key_from_jwt(token).key

        claims = jwt.decode(
            token,
            key,
            algorithms=["ES256", "RS256"],
            audience="authenticated",
        )

    except jwt.PyJWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
        )

    return {
        "id": claims["sub"],
        "email": claims.get("email"),
        "token": token,
    }