import os
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import sqlite3
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database connection
def get_db_connection():
    db_url = os.getenv('DATABASE_URL', 'sqlite:///backend/recipes.db')
    conn = sqlite3.connect(db_url[len('sqlite:///'):])
    conn.row_factory = sqlite3.Row
    return conn

# Pydantic model for recipe
class Recipe(BaseModel):
    name: str
    description: str
    ingredients: str

# Create recipes table if it doesn't exist
with get_db_connection() as conn:
    conn.execute('''
    CREATE TABLE IF NOT EXISTS recipes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT NOT NULL,
        ingredients TEXT NOT NULL
    )
    ''')
    conn.commit()

@app.get("/api/recipes")
def get_recipes():
    conn = get_db_connection()
    recipes = conn.execute('SELECT * FROM recipes').fetchall()
    conn.close()
    return [dict(recipe) for recipe in recipes]

@app.post("/api/recipes")
def create_recipe(recipe: Recipe):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('''
    INSERT INTO recipes (name, description, ingredients)
    VALUES (?, ?, ?)
    ''', (recipe.name, recipe.description, recipe.ingredients))
    conn.commit()
    conn.close()
    return {"id": cursor.lastrowid, "name": recipe.name, "description": recipe.description, "ingredients": recipe.ingredients}

@app.delete("/api/recipes/{recipe_id}")
def delete_recipe(recipe_id: int):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('DELETE FROM recipes WHERE id = ?', (recipe_id,))
    conn.commit()
    conn.close()
    if cursor.rowcount == 0:
        raise HTTPException(status_code=404, detail="Recipe not found")
    return {"message": "Recipe deleted successfully"}
