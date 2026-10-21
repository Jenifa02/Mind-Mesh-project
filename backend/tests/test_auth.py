
def test_me_without_token_returns_401(client):
    response = client.get("/me")

    assert response.status_code == 401


def test_me_with_malformed_token_returns_401(client):
    response = client.get(
        "/me",
        headers={"Authorization": "Bearer invalid-token"},
    )

    assert response.status_code == 401


