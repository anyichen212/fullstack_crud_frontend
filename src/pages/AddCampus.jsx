import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createNewCampusThunk } from '../redux/campuses/campusesActions';
import { useNavigate } from 'react-router-dom';
import UploadWidget from '../components/UploadWidget';

function AddCampus() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const campus = useSelector((state) => state.singleCampus);
    const allCampus = useSelector((state) => state.campus.allCampus);
    const [image, setImage] = useState("");
    
    const [state, setState] = useState({
        name: "",
        description: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        country: ""
    });

    //updates everytime an input field is change
    const handleChange = (e) => {
        const value = e.target.value;
        
        setState({
            ...state,
            [e.target.name]: value,
        });
    };

    //when submit is click
    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log("Submiting...", state);

        let nameExist = false;
        for(let c = 0 ; c < allCampus.length ; c++){
            if(allCampus[c].name === state.name){
                nameExist = true;
                break;
            }
        }

        if(nameExist){
            alert("Campus with the same name already exist in the system, please choose another name. (Example: 'campus2')")
        } else if(state.name === "" || state.address ==="" || state.city ==="" || state.state ==="" || state.country ===""){
            alert("One or More fields is empty, please fill them out.");
        } else if(state.zip.length != 5 || !(+state.zip)) {
            alert("Not A Valid Zip Code, please make sure it's a 5 digit code.");
        } else {

            let imgUrl ="https://www.brooklyn.edu/wp-content/uploads/NEWS-Default-1-Featured.jpg"
            if(image !== ""){
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
                    //console.log(data.secure_url);
                    
                    imgUrl = data.secure_url;
                })
                .catch((error) => {
                    console.log(error)
                })
            }

            console.log("Successfully dispatch to CreateNewCampusThunk");
            dispatch(createNewCampusThunk({...state, image: imgUrl}))
            .catch(error => alert(error));
            //.then(res => navigate(`/campus/${state.name}`));
        }
    };

    useEffect(()=>{
        if(campus)
            navigate(`/campus/${campus.id}`);
    },[campus]);

    const backButton = () => {
        navigate("/campus");
    }

  return (
    <div>
        <h1>Submit A New Campus</h1>
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
            <div><input type="file" onChange={(e) => setImage(e.target.files[0])}/></div>
            <div className="formButtons">
                <input className="submit" type='submit' value="Submit" />
                <input className="submit" type='button' value="Back" onClick={backButton} />
            </div>
        </form>
    </div>
    
  )
}

export default AddCampus