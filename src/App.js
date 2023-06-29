import React from 'react'
import './App.css';

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

//import pages
import Home from './pages/Home';
import AllCampus from './pages/AllCampus';
import AllStudents from './pages/AllStudents';

function App() {
  return (
    <Router>
    {
      //Navigation
    }
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/campus">Campus</Link>
        </li>
        <li>
          <Link to="/students">Students</Link>
        </li>
      </ul>
    </nav>

    {
      //routes
    }
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/campus" element={<AllCampus />} />
        <Route path="/students" element={<AllStudents />} />
      </Routes>
    </Router>
  );
}

export default App;
