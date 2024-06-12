import React from 'react';
import { Carousel, Container } from 'react-bootstrap';
import './LandingPage.css';
import PopularRecipes from './PopularRecipes';
import img1 from '../assets/img1.jpg';
import img2 from '../assets/img2.jpg';
import img3 from '../assets/img3.jpg';

const LandingPage = () => {
  return (
    <>
    <Container className="">
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src= {img1}
            alt="First slide"
          />
          <Carousel.Caption>
            <h1>Welcome to Recipe Central</h1>
            <p>Your favorite place to create, manage and share recipes.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={img2}
            alt="Second slide"
          />
          <Carousel.Caption>
            <h1>Discover New Recipes</h1>
            <p>Explore a variety of recipes from around the world.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src= {img3}
            alt="Third slide"
          />
          <Carousel.Caption>
            <h1>Create Your Own</h1>
            <p>Share your unique recipes with the community.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </Container>
    <PopularRecipes />
</>
  );
  
};

export default LandingPage;
