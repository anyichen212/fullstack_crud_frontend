import React, { useEffect, useState } from 'react'
import { createNewStudentThunk } from '../redux/students/studentActions';
import { fetchAllCampusThunk } from '../redux/campuses/campusesActions';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import validator from 'validator';

function AddStudent() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const student = useSelector((state) => state.singleStudent);
    const allCampus = useSelector((state) => state.campus.allCampus);
    const [state, setState] = useState({
        firstName: "",
        lastName: "",
        quote: "",
        email: "",
        gpa: 0.0,
        campusId: null,
        image: "https://www.st-andrews.ac.uk/dpl/1.1.0/assets/docs/images/placeholders/200x200.jpg",
    });

    //sort campus into alphabetic order by name
    function sortByKey(array, key) {
        return array.sort(function(a, b) {
            var x = a[key]; var y = b[key];
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
    }

    //update change when any field is change
    const handleChange = (e) => {
        let value = e.target.value;
        if(e.target.name === "quote" && value === "")
            value=null;

        setState({
            ...state,
            [e.target.name]: value,
        });
    };

    //match campus name to the accurate id
    const handleIdChange = (e) => {
        const value = e.target.value;

        console.log("campus id : ", value);

        if(value == -1){
            setState({
                ...state,
                [e.target.name]: null,
            });
        }
        else
            setState({
                ...state,
                [e.target.name]: value,
            });
    }

    //fetch all campus to selector
    useEffect(() => {
        const fetchAllCampus = () => {
          return dispatch(fetchAllCampusThunk());
        };
        fetchAllCampus();
      }, []);

    //navigate to new student page
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

    //back button
    const backButton = () => {
        navigate("/students");
    }

  return (
    <div>
        <h1>Add A New Student</h1>
        <form className="studentForm" onSubmit={handleSubmit}>
            <label 
                style={{
                    width:'90%',
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between'
                }}>
                <div>
                    <div style={{marginLeft: '15px'}}>*First Name:</div>
                    <input 
                    style={{
                        width:'87%',
                        margin: '5px',
                        fontSize: '20px',
                        borderRadius: '10px',
                        padding: '5px 15px'
                        }} 
                    name="firstName" 
                    type='text' 
                    value={state.firstName} 
                    onChange={handleChange} 
                    />
                </div>

                <div>
                    <div style={{marginLeft: '15px'}}>*Last Name:</div>
                    <input
                    style={{
                        width:'87%',
                        margin: '5px',
                        fontSize: '20px',
                        borderRadius: '10px',
                        padding: '5px 15px'
                        }} 
                    name="lastName" 
                    type='text' 
                    value={state.lastName} 
                    onChange={handleChange} 
                    />
                </div>
            </label>
            
            <label 
                style={{
                    width:'90%',
                    display: 'flex',
                    flexWrap: 'wrap',
                }}>
                <div style={{width: '500px'}}>
                    <div style={{marginLeft: '15px'}}>Campus:</div>
                    <select
                        style={{
                            width:'80%',
                            margin: '5px',
                            fontSize: '20px',
                            borderRadius: '10px',
                            padding: '5px 15px'
                            }}
                        name="campusId" 
                        onChange={handleIdChange}
                    >
                        <option key={-1} value={-1}>None</option>
                        {sortByKey(allCampus, "name").map((item) => {
                            return <option key={item.id} value={item.id}>
                                {item.name}
                            </option>
                        })}
                    </select>
                </div>

                <div style={{width: '180px'}}>
                    <div style={{marginLeft: '15px'}}>GPA (0.0 - 4.0):</div>
                    <input
                    style={{
                            width:'80%',
                            margin: '5px 5px 5px 5px',
                            fontSize: '20px',
                            borderRadius: '10px',
                            padding: '5px 15px'
                            }} 
                    name="gpa" 
                    type='number' 
                    value={state.gpa} 
                    onChange={handleChange} 
                    min="0.0" 
                    max="4.0" 
                    step="0.1" />
                </div>
                
            </label>

            <label style={{width:'90%'}} >
                <div style={{marginLeft: '15px'}}>*Email:</div>
                <input
                style={{
                    width:'100%',
                    margin: '5px',
                    fontSize: '20px',
                    borderRadius: '10px',
                    padding: '5px 15px'
                    }}
                 name="email" 
                 type='email' 
                 value={state.email} 
                 onChange={handleChange} />
            </label>


            <label style={{width:'90%'}} >
                <div style={{marginLeft: '15px'}}>Quote:</div>
                <input
                 style={{
                    width:'100%',
                    margin: '5px',
                    fontSize: '20px',
                    borderRadius: '10px',
                    padding: '5px 15px'
                    }}
                 name="quote" 
                 type='text' 
                 value={state.quote} 
                 onChange={handleChange} />
            </label>
            
            <div className="formButtons">
                <input className="submit" type='submit' value='Submit' />
                <input className="submit" type='button' value="Back" onClick={backButton} />
            </div>
        </form>
    </div>
  )
}

export default AddStudent;