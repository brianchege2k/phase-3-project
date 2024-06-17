import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Modal } from 'react-bootstrap';

const MyRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentRecipe, setCurrentRecipe] = useState({
    id: '',
    name: '',
    description: '',
    ingredients: '',
  });

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

  const handleShowModal = (recipe) => {
    setCurrentRecipe(recipe);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentRecipe({
      id: '',
      name: '',
      description: '',
      ingredients: '',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentRecipe({
      ...currentRecipe,
      [name]: value,
    });
  };

  const handleUpdateRecipe = () => {
    fetch(`http://localhost:8000/api/recipes/${currentRecipe.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(currentRecipe),
    })
      .then(response => response.json())
      .then(updatedRecipe => {
        setRecipes(recipes.map(recipe => (recipe.id === updatedRecipe.id ? updatedRecipe : recipe)));
        handleCloseModal();
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
                <Button variant="warning" onClick={() => handleShowModal(recipe)}>Edit</Button>
                {' '}
                <Button variant="danger" onClick={() => deleteRecipe(recipe.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Recipe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formRecipeName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={currentRecipe.name}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formRecipeDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={currentRecipe.description}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formRecipeIngredients">
              <Form.Label>Ingredients</Form.Label>
              <Form.Control
                type="text"
                name="ingredients"
                value={currentRecipe.ingredients}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
          <Button variant="primary" onClick={handleUpdateRecipe}>Save changes</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MyRecipes;
