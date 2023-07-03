import React from 'react'
import { useNavigate } from 'react-router-dom';

function StudentCard(props) {
    const navigate = useNavigate();
    const student = props.student;

    const navigateToStudent = () => {
        navigate(`/students/${student.id}`)
    }

  return (
    <div onClick={navigateToStudent}>Name: {student.firstName} {student.lastName}</div>
  )
};

export default StudentCard