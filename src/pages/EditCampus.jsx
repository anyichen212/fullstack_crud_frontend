import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { editCampusThunk } from '../redux/campuses/campusesActions';
import { useNavigate } from 'react-router-dom';

function EditCampus() {
    const campus = useSelector((state) => state.singleCampus);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [state, setState] = useState(campus);

    const handleChange = (e) => {
        const value = e.target.value;
        
        setState({
            ...state,
            [e.target.name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Complete editing...", state);
        if(state.name === "" || state.address ==="" || state.city ==="" || state.state ==="" || state.country ===""){
            alert("One or More fields is empty, please fill them out.");
        } else if(state.zip.length != 5 || !(+state.zip)) {
            alert("Not A Valid Zip Code, please make sure it's a 5 digit code.");
        } else {
            console.log("Successfully dispatch to EditNewCampusThunk");
            dispatch(editCampusThunk(state,campus.id))
            .then(res => navigate(`/campus/${campus.id}`));
        }
    };

    //redirect back to campus without editing
    const cancelButton = () => {
        navigate(`/campus/${campus.id}`);
    }

  return (
    <div>
        <h1>Editing CAMPUS : {campus.name}</h1>
        <form className="campusForm" onSubmit={handleSubmit}>
            <label style={{width:'90%'}}>
                <div style={{marginLeft: '15px'}}>*Campus Name:</div>
                <input 
                style={{
                    width:'100%',
                    margin: '5px',
                    fontSize: '20px',
                    borderRadius: '10px',
                    padding: '5px 15px'
                    }} 
                name='name' 
                type="text" 
                value={state.name} 
                onChange={handleChange} />
            </label>
            <label style={{width:'90%'}}>
                <div  style={{marginLeft: '15px'}} >*Address:</div>
                <input
                style={{
                    width:'100%',
                    margin: '5px',
                    fontSize: '20px',
                    borderRadius: '10px',
                    padding: '5px 15px'
                    }}
                 name='address' 
                 type="text" 
                 value={state.address } 
                 onChange={handleChange} />
            </label>
            <label style={{
                width:'90%',
                display: 'flex',
                flexWrap: 'wrap',
                }}>
                <div>
                    <div style={{marginLeft: '15px'}} >*City:</div>
                    <input
                    style={{
                        width:'70%',
                        margin: '5px',
                        fontSize: '20px',
                        borderRadius: '10px',
                        padding: '5px 15px'
                        }}
                    name='city' 
                    type="text" 
                    value={state.city} 
                    onChange={handleChange} />
                </div>

                <div>
                    <div style={{marginLeft: '15px'}} >*State:</div>
                    <input
                    style={{
                        width:'70%',
                        margin: '5px',
                        fontSize: '20px',
                        borderRadius: '10px',
                        padding: '5px 15px'
                        }}
                    name='state' 
                    type="text" 
                    value={state.state} 
                    onChange={handleChange} />
                </div>

            </label>
            <label style={{
                width:'90%',
                display: 'flex',
                flexWrap: 'wrap',
                }}>
                <div>
                    <div style={{marginLeft: '15px'}} >*Zip (5 digit number):</div>
                    <input
                    style={{
                        width:'70%',
                        margin: '5px',
                        fontSize: '20px',
                        borderRadius: '10px',
                        padding: '5px 15px'
                        }}
                    name='zip' 
                    type="text" 
                    value={state.zip} 
                    onChange={handleChange} 
                    />
                </div>
                
                <div>
                    <div style={{marginLeft: '15px'}} >*Country:</div>
                    <input
                    style={{
                        width:'70%',
                        margin: '5px',
                        fontSize: '20px',
                        borderRadius: '10px',
                        padding: '5px 15px'
                        }}
                    name='country' 
                    type="text" 
                    value={state.country} 
                    onChange={handleChange} />
                </div>

            </label>
            <label style={{width:'90%'}}>
                <div style={{marginLeft: '15px'}} >Description:</div>
                <input
                style={{
                    width:'100%',
                    height: '200%',
                    margin: '5px',
                    fontSize: '20px',
                    borderRadius: '10px',
                    padding: '5px 15px'
                }} 
                name='description' 
                type="text" 
                value={state.description } 
                onChange={handleChange} 
                />
            </label>
            <div className="formButtons">
                <input className="submit" type='submit' value="Finish Edit" />
                <input className="submit" type='button' value="Cancel" onClick={cancelButton} />
            </div>
        </form>
    </div>
    
  )
}

export default EditCampus;