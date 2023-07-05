import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteStudentThunk, fetchStudentThunk } from '../redux/students/studentActions';

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

  const deleteStudent = () => {
    console.log(`deleting student ${studentid}...`);
    dispatch(deleteStudentThunk(studentid));
    navigate("/students");
  }

  if(loading){
    return <h1>LOADING...</h1>
  }
  else if(student == null) {
    return <Error msg={`Not a valid student id`}/>
  } else {
    return (
      <div>
        Student : {student.id} , Campus: {student.campus.name}
        <button onClick={deleteStudent}>Delete</button>
      </div>
    )
  }

}

export default Student