import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../assets/RECIPIX.svg';

const SideBar = () => {
  return (
    <div className="d-flex flex-column vh-100 bg-light p-3">
      <img src={logo} alt='logo' className='logo'></img>
      <Nav defaultActiveKey="/" className="flex-column">
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/recipes">My Recipes</Nav.Link>
        <Nav.Link href="/create">Create Recipe</Nav.Link>
      </Nav>
    </div>
  );
};

export default SideBar;
