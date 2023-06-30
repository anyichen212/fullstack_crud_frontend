import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { createNewCampusThunk } from '../redux/campuses/campusesActions';

function AddCampus() {
    const dispatch = useDispatch();
    const [state, setState] = useState({
        name: "",
        description: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        country: "",
        image: null,
    });
    //const [name, setName] = useState("");
    //const [address, setAddress] = useState("");

    const handleChange = (e) => {
        const value = e.target.value;
        if(e.target.name === "description" && value === "")
            value = null;
        
        setState({
            ...state,
            [e.target.name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submiting...", state);
        if(state.name === "" || state.address ==="" || state.city ==="" || state.state ==="" || state.country ===""){
            alert("One or More fields is empty, please fill them out.");
        } else if(state.zip.length != 5 || !(+state.zip)) {
            alert("Not A Valid Zip Code, please make sure it's a 5 digit code.");
        } else {
            console.log("Successfully dispatch to CreateNewCampusThunk");
            dispatch(createNewCampusThunk(state));
        }
    };

  return (
    <div>
        <h1>Add A New Campus</h1>
        <form onSubmit={handleSubmit}>
            <label>
                Campus Name:
                <input name='name' type="text" value={state.name} onChange={handleChange} />
            </label>
            <label>
                Address:
                <input name='address' type="text" value={state.address } onChange={handleChange} />
            </label>
            <label>
                City:
                <input name='city' type="text" value={state.city} onChange={handleChange} />
            </label>
            <label>
                State:
                <input name='state' type="text" value={state.state} onChange={handleChange} />
            </label>
            <label>
                Zip:
                <input name='zip' type="text" value={state.zip} onChange={handleChange} />
            </label>
            <label>
                Country:
                <input name='country' type="text" value={state.country} onChange={handleChange} />
            </label>
            <label>
                Description:
                <input name='description' type="text" value={state.description } onChange={handleChange} />
            </label>
            <input type='submit' value="Submit" />
        </form>
    </div>
    
  )
}

export default AddCampus