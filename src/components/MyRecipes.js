// src/components/MyRecipes.js

import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';

const MyRecipes = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/recipes')
      .then(response => response.json())
      .then(data => setRecipes(data));
  }, []);

  const deleteRecipe = (id) => {
    fetch(`http://localhost:8000/api/recipes/${id}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setRecipes(recipes.filter(recipe => recipe.id !== id));
      });
  };

  return (
    <div className="container mt-4">
      <h2>My Recipes</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Description</th>
            <th>Ingredients</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {recipes.map((recipe, index) => (
            <tr key={recipe.id}>
              <td>{index + 1}</td>
              <td>{recipe.name}</td>
              <td>{recipe.description}</td>
              <td>{recipe.ingredients}</td>
              <td>
                <Button variant="danger" onClick={() => deleteRecipe(recipe.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default MyRecipes;
