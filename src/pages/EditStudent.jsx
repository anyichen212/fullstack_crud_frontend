import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchAllCampusThunk } from '../redux/campuses/campusesActions';
import { editStudentThunk, fetchStudentThunk } from '../redux/students/studentActions';

import validator from 'validator';

function EditStudent() {
    const student = useSelector((state) => state.singleStudent);
    const {studentid} = useParams();
    const allCampus = useSelector((state) => state.campus.allCampus);
    const ref = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [image, setImage] = useState("");
    const [state, setState] = useState(student);

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

        if(value === -1){
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

    //fetch single student
    useEffect(() => {
        dispatch(fetchStudentThunk(studentid));
    }, [allCampus])
    

    //when submit is click
    const handleSubmit = async(e) => {
        console.log("Submitting...", state);
        e.preventDefault();
        
        //alert the user for changes if any error are caught
        //Validator checks if state.email is a valid email
        if(!validator.isEmail(state.email)){
            alert("Not A Valid Email. Please Enter A Valid Email.");
        } else if(state.firstName==="" || state.lastName==="" || state.email==="" || state.campus===""){
            alert("One or More fields is empty, please fill them out.");
        } else {

            //generate image url from cloudinary is an image is uploaded
            let imgUrl;
            if(image !== ""){
                //image is change
                const data = new FormData();
                data.append("file", image);
                data.append("upload_preset", process.env.REACT_APP_CLOUDINARY_PRESET);
                data.append("cloud_name", process.env.REACT_APP_CLOUDINARY_NAME);
                
                await fetch(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_NAME}/image/upload`, {
                    method: "post",
                    body: data
                })
                .then((res) => res.json())
                .then((data) => {
                    imgUrl = data.secure_url;
                })
                .catch((error) => {
                    console.log(error)
                })

                dispatch(editStudentThunk({...state, image: imgUrl}, student.id))
                .then(res => navigate(`/students/${student.id}`))

            } else {
                //no image change
                dispatch(editStudentThunk(state, student.id))
                .then(res => navigate(`/students/${student.id}`))

            }

        }

    };

    //back button
    const backButton = () => {
        navigate("/students");
    }

  return (
    <div>
        <h1>Edit Student</h1>
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

            <label>
                <div style={{marginLeft: '15px'}} >
                    Update Image: &nbsp;&nbsp;
                    <input className="imgSubmit" id="imgSub" ref={ref} type="file" onChange={(e) => setImage(e.target.files[0])}/>
                    <input className="imgButton" type='button' value="Cancel Image" onClick={(e) => {
                        ref.current.value=null;
                        setImage("");
                    }}  />
                </div>
            </label>
            
            <div className="formButtons">
                <input className="submit" type='submit' value='Submit' />
                <input className="submit" type='button' value="Back" onClick={backButton} />
            </div>
        </form>
    </div>
  )
}

export default EditStudent