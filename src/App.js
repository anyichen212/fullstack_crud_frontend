import React from 'react'
import './App.css';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//import pages
import Home from './pages/Home';
import AllCampus from './pages/AllCampus';
import AllStudents from './pages/AllStudents';
import Student from './pages/Student';
import Campus from './pages/Campus';
import AddCampus from './pages/AddCampus';
import Error from './pages/Error';
import EditCampus from './pages/EditCampus';
import AddStudent from './pages/AddStudent';
import Navigate from './components/Navigate';
import Footer from './components/Footer';

function App() {

  return (
    <Router>
    {
      //Navigation
    }
    <Navigate />

    {
      //routes
    }
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/campus" element={<AllCampus />} />
        <Route path="/students" element={<AllStudents />} />
        <Route path="/campus/:campusid" element={<Campus />}/>
        <Route path="/addcampus" element={<AddCampus />} />
        <Route path="/addstudent" element={<AddStudent />} />
        <Route path="/campus/:campusid/edit" element={<EditCampus />} />
        <Route path="/students/:studentid" element={<Student />}/>
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
