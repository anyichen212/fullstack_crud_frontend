import React from 'react'
import { useNavigate } from 'react-router-dom';
import { MdPerson } from 'react-icons/md';

function StudentButton(props) {
    const student = props.student;
    const navigate = useNavigate();

    const toStudentPage = () => {
        navigate(`/students/${student.id}`);
    }

  return (
    <button className="sButton" onClick={toStudentPage}> 
    <MdPerson size={45} style={{margin: "-10px 7px -10px 0"}}  /> 
    {student.firstName} {student.lastName}  
    </button>
  )
}

export default StudentButton