import React from 'react'
import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";
import LoginPage from './pages/LoginPage';
import './index.css'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  )
}







export default App
