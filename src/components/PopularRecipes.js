import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import '../App.css';
import spoonacularLogo from '../assets/spoonacular.png';

const PopularRecipes = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const API_KEY = process.env.REACT_APP_SPOONACULAR_API_KEY;
        const response = await axios.get(`https://api.spoonacular.com/recipes/random?number=6&apiKey=${API_KEY}`);
        setRecipes(response.data.recipes);
      } catch (error) {
        console.error('Error fetching the recipes:', error);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <Container className="mt-4">
      <h2>View Some Popular Recipes Across the Web</h2>
      <img src ={spoonacularLogo} alt='spooncaularlogo' className='spoonacular-logo' ></img>
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
