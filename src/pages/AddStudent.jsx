import React, { useEffect, useState } from 'react'
import { createNewStudentThunk } from '../redux/students/studentActions';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import validator from 'validator';

function AddStudent() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const student = useSelector((state) => state.singleStudent);
    const [state, setState] = useState({
        firstName: "",
        lastName: "",
        quote: "",
        email: "",
        gpa: 0.0,
        campus: "",
        image: "https://www.brooklyn.edu/wp-content/uploads/NEWS-Default-1-Featured.jpg",
    });

    //update change when any field is change
    const handleChange = (e) => {
        const value = e.target.value;
        if(e.target.name === "quote" && value === "")
            value=null;

        setState({
            ...state,
            [e.target.name]: value,
        });
    };

    useEffect(()=>{
        if(student)
            navigate(`/students/${student.id}`);
    },[student]);
    

    //when submit is click
    const handleSubmit = (e) => {
        console.log("Submitting...", state);
        e.preventDefault();
        
        if(!validator.isEmail(state.email)){
            alert("Not A Valid Email. Please Enter A Valid Email.");
        } else if(state.firstName==="" || state.lastName==="" || state.email==="" || state.campus===""){
            alert("One or More fields is empty, please fill them out.");
        } else {
            console.log("Successfully dispatch to CreateNewStudentThunk");
            dispatch(createNewStudentThunk(state));
        }

    };

  return (
    <div>
        <h1>Add A New Student</h1>
        <form onSubmit={handleSubmit}>
            <label>
                First Name:
                <input name="firstName" type='text' value={state.firstName} onChange={handleChange} />
            </label>
            <label>
                Last Name:
                <input name="lastName" type='text' value={state.lastName} onChange={handleChange} />
            </label>
            <label>
                Email:
                <input name="email" type='email' value={state.email} onChange={handleChange} />
            </label>
            <label>
                Campus:
                <input name="campus" type='text' value={state.campus} onChange={handleChange} />
            </label>
            <label>
                GPA (0.0 - 4.0):
                <input name="gpa" type='number' value={state.gpa} onChange={handleChange} min="0.0" max="4.0" step="0.1" />
            </label>
            <label>
                Quote:
                <input name="quote" type='text' value={state.quote} onChange={handleChange} />
            </label>
            <input type='submit' value='Submit' />
        </form>
    </div>
  )
}

export default AddStudent;