import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchCampusThunk } from '../redux/campuses/campusesActions';
import Error from './Error';

function Campus() {
  const singleCampus = useSelector((state) => state.singleCampus);
  const {campusid} = useParams();
  console.log("On single campus page, campus id:", campusid);

  const dispatch = useDispatch();
  useEffect(() => {
    const fetchCampus = () => {
      console.log("Dispatch from fetch campus");
      dispatch(fetchCampusThunk(campusid));
    };
    fetchCampus();
  }, []);


  console.log("Single Campus : ", singleCampus);

  //loading if campus is null
  if(!singleCampus){
    return (
      <Error msg ={`${campusid} is not a valid campus search.`}/>
    )
  } else {
    return (
      <div>Campus :</div>
    )
  }
}

export default Campus