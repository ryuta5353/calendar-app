import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddSchedulePage from './pages/AddSchedulePage';
import RegisterPage from './pages/RegisterPage';

function App(){
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;