import React from 'react'
import { useNavigate } from 'react-router-dom';
import { MdPerson } from 'react-icons/md';

import { deleteStudentThunk } from '../redux/students/studentActions';
import { useDispatch } from 'react-redux';

function StudentCard(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const student = props.student;

    const navigateToStudent = () => {
        navigate(`/students/${student.id}`)
    }

    //delete student
    const deleteStudent = () => {
      console.log(`deleting student ${student.id}...`);
      dispatch(deleteStudentThunk(student.id));
    }

  return (
    <div className='studentCard'>
        <input onClick={deleteStudent} className='xButton' type="button" value="Delete"  />
        <div 
          className="student" 
          onClick={navigateToStudent}>
            <MdPerson size={40} style={{margin: "-10px 7px -10px 0"}}  /> 
            {student.firstName} {student.lastName} 
            </div>
    </div>

  )
};

export default StudentCard