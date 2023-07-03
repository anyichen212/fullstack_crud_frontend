import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchStudentThunk } from '../redux/students/studentActions';

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

  if(loading){
    return <h1>LOADING...</h1>
  }
  else if(!student) {
    <Error msg={`Not a valid student id`}/>
  } else {
    return (
      <div>
        Student : {student.id}
      </div>
    )
  }

}

export default Student