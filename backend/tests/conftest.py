
import pytest  # type: ignore[reportMissingImports]
from fastapi.testclient import TestClient  # type: ignore[reportMissingImports]


from app.main import app


@pytest.fixture
def client():
    with TestClient(app) as test_client:
        yield test_client
        
      

