import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import './PopularRecipes.css';

const PopularRecipes = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(`https://api.spoonacular.com/recipes/random?number=6&apiKey=ea8153fa7bca41078c8d455fc9f8e682`);
        setRecipes(response.data.recipes);
      } catch (error) {
        console.error('Error fetching the recipes:', error);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <Container className="mt-4">
      <h2>Popular Recipes</h2>
      <Row>
        {recipes.map((recipe) => (
          <Col key={recipe.id} sm={12} md={6} lg={4} className="mb-4">
            <Card>
              <Card.Img variant="top" src={recipe.image} />
              <Card.Body>
                <Card.Title>{recipe.title}</Card.Title>
                <Card.Text>
                  {recipe.summary.replace(/<[^>]+>/g, '').substring(0, 100)}...
                </Card.Text>
                <Button variant="primary" href={recipe.sourceUrl} target="_blank">View Recipe</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default PopularRecipes;
