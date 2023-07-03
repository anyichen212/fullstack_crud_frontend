import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllStudentThunk } from '../redux/students/studentActions';
import StudentCard from '../components/StudentCard';
import { useNavigate } from 'react-router-dom';

function AllStudents() {
  const allStudent = useSelector((state) => state.allStudent.allStudent);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllStudent = () => {
      console.log("Dispatch from fetch all students.");
      return dispatch(fetchAllStudentThunk());
    };
    fetchAllStudent();
    console.log("All Student:", allStudent);
  }, []);

  //add new student button, navigate to addStudent page
  const addStudent = () => {
    navigate("/addStudent");
  }

  //loading if allStudent list is null
  if(!allStudent){
    return (
      <h2>LOADING...</h2>
    )
  }

  return (
    <div>
      <h1> All Students </h1>
      <div>
        <div><button onClick={addStudent}>ADD New Student</button></div>
        {allStudent.map((item) => {
          return <StudentCard key={item.id} student={item}/>
        })}
      </div>
    </div>
  )
}

export default AllStudents