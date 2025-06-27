import React from 'react'
import LandingPage from "./pages/LandingPage";
import SelectPage from "./pages/SelectPage"
import LoginPage from "./pages/LoginPage"
import HomePage from "./pages/HomePage"
import CoursesPage from './pages/CoursesPage';
import './index.css'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/select" element={<SelectPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/courses" element={<CoursesPage />} />
      </Routes>
    </Router>
  )
}


export default App
