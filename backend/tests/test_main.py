import pytest
from httpx import AsyncClient
from main import app

@pytest.mark.asyncio
async def test_get_recipes():
    async with AsyncClient(app=app, base_url="http://test") as ac:
        response = await ac.get("/api/recipes")
    assert response.status_code == 200
    assert response.json() == []

@pytest.mark.asyncio
async def test_create_recipe():
    new_recipe = {
        "name": "Test Recipe",
        "description": "This is a test recipe",
        "ingredients": "Test ingredients"
    }
    
    async with AsyncClient(app=app, base_url="http://test") as ac:
        response = await ac.post("/api/recipes", json=new_recipe)
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == new_recipe["name"]
    assert data["description"] == new_recipe["description"]
    assert data["ingredients"] == new_recipe["ingredients"]

    # Verify that the recipe was added
    response = await ac.get("/api/recipes")
    assert response.status_code == 200
    recipes = response.json()
    assert len(recipes) == 1
    assert recipes[0]["name"] == new_recipe["name"]
    assert recipes[0]["description"] == new_recipe["description"]
    assert recipes[0]["ingredients"] == new_recipe["ingredients"]
