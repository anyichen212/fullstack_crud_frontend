import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllStudentThunk } from '../redux/students/studentActions';

function AllStudents() {
  const allStudent = useSelector((state) => state.allStudent.allStudent);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllStudent = () => {
      console.log("Dispatch from fetch all students.");
      return dispatch(fetchAllStudentThunk());
    };
    fetchAllStudent();
    console.log("All Student:", allStudent);
  }, []);

  return (
    <div>AllStudents</div>
  )
}

export default AllStudents