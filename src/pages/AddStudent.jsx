import React, { useState } from 'react'

function AddStudent() {
    const [state, setState] = useState({
        firstName: "",
        lastName: "",
        quote: "",
        email: "",
        gpa: 0.0,
        campus: "",
        image: null,
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

    //when submit is click
    const handleSubmit = (e) => {
        console.log("Submitting...", state);
        e.preventDefault();
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

export default AddStudent