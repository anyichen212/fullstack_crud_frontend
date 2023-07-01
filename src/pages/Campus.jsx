import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { redirect, useNavigate, useParams } from 'react-router-dom';
import { deleteCampusThunk, fetchCampusThunk } from '../redux/campuses/campusesActions';
import Error from './Error';

function Campus() {
  const singleCampus = useSelector((state) => state.singleCampus);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const {campusid} = useParams();
  console.log("On single campus page, campus id:", campusid);

  const dispatch = useDispatch();
  useEffect(() => {
    const fetchCampus = async() => {
      setLoading(true);
      console.log("Dispatch from fetch campus");
      dispatch(fetchCampusThunk(campusid))
        .then(e => {setLoading(false)});
    };
    fetchCampus();
  }, []);

  //delete button onclick
  const deleteCampus = () => {
    console.log(`Deleting Campus name ${singleCampus.name}, Campus id: ${singleCampus.id}... `);

    dispatch(deleteCampusThunk(singleCampus.id))
    .then(res => {
      console.log("delect success, ", res);
      navigate("/campus");
    });
  }

  //edit button onclick
  const editCampus = () => {
    console.log(`Editing Campus name ${singleCampus.name}, Campus id: ${singleCampus.id}... `);
    navigate(`/campus/${singleCampus.id}/edit`);
  }

  console.log("Single Campus : ", singleCampus);

  //loading if campus is null
  if(loading){
    return <h1>LOADING...</h1>
  }
  else if(!singleCampus){
    return (
      <Error msg ={`${campusid} is not a valid campus search.`}/>
    )
  } else {
    return (
      <div>
        <h2>Campus : {singleCampus.name}</h2>
        <div>
          <button onClick={editCampus}>Edit</button>
          <button onClick={deleteCampus}>Delete</button>
        </div>
      </div>
    )
  }
}

export default Campus