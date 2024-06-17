
import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';

const MyRecipes = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/recipes`)
      .then(response => response.json())
      .then(data => setRecipes(data))
      .catch(error => console.error('Error fetching recipes:', error));
  }, []);

  const deleteRecipe = (id) => {
    fetch(`${process.env.REACT_APP_API_URL}/api/recipes/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          setRecipes(recipes.filter(recipe => recipe.id !== id));
        } else {
          console.error('Error deleting recipe:', response.statusText);
        }
      })
      .catch(error => console.error('Error deleting recipe:', error));
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
