import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllStudentThunk } from '../redux/students/studentActions';
import StudentCard from '../components/StudentCard';
import { useNavigate } from 'react-router-dom';
import { MdPersonAdd } from 'react-icons/md'

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
  }, [allStudent]);

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

  //if no student, student length is 0
  if(allStudent.length === 0){
    return (
      <div>
        <h1> All Students </h1>
        <div>No Student here. Add one!</div>
        <div><button onClick={addStudent}>ADD Student</button></div>
      </div>

    )
  }

  return (
    <div>
      <h1> All Students </h1>
      <div className="allStudent">
        <button className="addStudentButton"  onClick={addStudent}>
        <MdPersonAdd size={40} style={{margin: "-10px 7px -10px 0"}} /> ADD Student
        </button>
        {allStudent.map((item) => {
          return <StudentCard key={item.id} student={item}/>
        })}
      </div>
    </div>
  )
}

export default AllStudents