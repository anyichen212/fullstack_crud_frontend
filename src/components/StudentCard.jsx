import React from 'react'
import { useNavigate } from 'react-router-dom';
import { MdPerson } from 'react-icons/md';

function StudentCard(props) {
    const navigate = useNavigate();
    const student = props.student;

    const navigateToStudent = () => {
        navigate(`/students/${student.id}`)
    }

  return (
    <div className="student" onClick={navigateToStudent}><MdPerson size={40} style={{margin: "-10px 7px -10px 0"}}  /> {student.firstName} {student.lastName} </div>
  )
};

export default StudentCard