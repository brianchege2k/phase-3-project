// src/components/CreateRecipe.js

import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const CreateRecipe = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRecipe = { name, description, ingredients };
    
    fetch('http://localhost:8000/api/recipes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newRecipe),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Recipe created:', data);
      setName('');
      setDescription('');
      setIngredients('');
    });
  };

  return (
    <div className="container mt-4">
      <h2>Create Recipe</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formRecipeName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter recipe name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formRecipeDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter recipe description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formRecipeIngredients">
          <Form.Label>Ingredients</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter recipe ingredients"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default CreateRecipe;
