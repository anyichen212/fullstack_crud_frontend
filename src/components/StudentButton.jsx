import React, { Fragment } from 'react'
import { useNavigate } from 'react-router-dom';
import { MdPerson } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { editStudentThunk } from '../redux/students/studentActions';

function StudentButton(props) {
    const student = props.student;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const toStudentPage = () => {
        navigate(`/students/${student.id}`);
    }

    const removeStudentFromCampus = () => {
      const obj = {campusId: null};
      dispatch(editStudentThunk(obj,student.id));
      navigate(0);
    }

  return (
    <Fragment>
      <button className="sButtonInCampus" onClick={toStudentPage}> 
        <MdPerson size={45} style={{margin: "-10px 7px -10px 0"}}  /> 
        {student.firstName} {student.lastName}  
      </button>
      <button className='dButton' onClick={removeStudentFromCampus}>
        X
      </button>
    </Fragment>
    
  )
}

export default StudentButton