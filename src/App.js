import React from 'react'
import './App.css';

import { BrowserRouter as Router, Routes, Route, Link, useParams } from "react-router-dom";

//import pages
import Home from './pages/Home';
import AllCampus from './pages/AllCampus';
import AllStudents from './pages/AllStudents';
import Student from './pages/Student';
import Campus from './pages/Campus';
import AddCampus from './pages/AddCampus';
import Error from './pages/Error';

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
        <Route path="/campus/:campusid" element={<Campus />}/>
        <Route path="/addcampus" element={<AddCampus />} />
        <Route path="/students/:studentid" element={<Student />}/>
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
