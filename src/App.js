import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SideBar from './components/SideBar';
import LandingPage from './components/LandingPage';
import MyRecipes from './components/MyRecipes';
import CreateRecipe from './components/CreateRecipe';
import './App.css';

function App() {
  return (
    <Router>
      <div className="d-flex">
        <div className="sidebar">
          <SideBar />
        </div>
        <div className="content flex-grow-1">
          <Routes>
            <Route path="/" element={<LandingPage/>} />
            <Route path="/recipes" element={<MyRecipes/>} />
            <Route path="/create" element={<CreateRecipe/>} />
            
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
