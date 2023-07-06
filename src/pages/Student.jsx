import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteStudentThunk, editStudent, fetchStudentThunk } from '../redux/students/studentActions';
import { MdHome } from 'react-icons/md';

import Error from './Error';

function Student() {
  const [loading,setLoading] = useState(true);
  const {studentid} = useParams();
  const student = useSelector((state) => state.singleStudent);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log("On single student page, student id:", studentid);

  useEffect(() => {
    const fetchStudent = async() => {
      setLoading(true);
      console.log("Dispatch from fetchStudent");
      dispatch(fetchStudentThunk(studentid))
        .then(res => {setLoading(false)});
    };
    fetchStudent();
  }, []);

  //delete studen, click to delete and navigate to new allStudent page
  const deleteStudent = () => {
    console.log(`deleting student ${studentid}...`);
    dispatch(deleteStudentThunk(studentid));
    navigate("/students");
  }

  const editStudent = () => {
    console.log(`editing student ${studentid}...`);
    navigate(`/students/${student.id}/edit`);
  }

  //redirect to campus
  const toCampus = () => {
    navigate(`/campus/${student.campusId}`);
  }

  if(loading){
    return <h1>LOADING...</h1>
  }
  else if(student == null) {
    return <Error msg={`Not a valid student id`}/>
  } else {
    return (
      <div style={{textAlign:"center"}}>
        <h1>Student Profile</h1>
        <img style={{height:"350px", width:'325px', objectFit:'cover'}} src={student.image} alt="student photo"/>
        <div>
          <button className="singleButton" onClick={editStudent} >Edit</button>
          <button className="singleButton" onClick={deleteStudent}>Delete</button>
        </div>

        <h4 style={{fontSize:'50px'}}>{student.firstName}  {student.lastName}</h4>
        <h3>"{student.quote==="" ? "N/A" : student.quote}"</h3>

        <div style={{marginBottom:'20px'}}>
          <h2 style={{fontSize:'35px'}} >GPA</h2>
          <h4 style={{fontSize:'20px'}}>{student.gpa}</h4>
        </div>
        <div style={{marginBottom:'20px'}}>
          <h2 style={{fontSize:'35px'}} >Email</h2>
          <h4 style={{fontSize:'20px'}}>{student.email}</h4>
        </div>
        <div style={{marginBottom:'20px'}}>
          <h2 style={{fontSize:'35px'}} >Campus</h2>
          {
            student.campusId === null 
            ? <h4 style={{fontSize:'20px'}}>Not Enroll In any Campus in the system</h4>
            : <button onClick={toCampus} className="sButton"><MdHome size={40} style={{margin: "-10px 7px -10px 0"}}/>{student.campus.name}</button>
          }
        </div>
        
        <footer />
      </div>
    )
  }

}

export default Student