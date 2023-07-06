import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllCampusThunk } from '../redux/campuses/campusesActions';

import CampusCard from '../components/CampusCard';
import { useNavigate } from 'react-router-dom';

import { MdAddHome } from 'react-icons/md';

function AllCampus() {
  const allCampus = useSelector((state) => state.campus.allCampus);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  useEffect(() => {
    const fetchAllCampus = () => {
      console.log("Distpatch from FetchAllCampus");
      return dispatch(fetchAllCampusThunk());
    };
    console.log("useEffect : fetch all campus");
    fetchAllCampus();
    console.log("All Campus : ", allCampus);
  }, [allCampus]);

  //loading if allCampus list is null
  if(!allCampus){
    return (
      <h2>LOADING...</h2>
    )
  }

  //trigger by addCampus button, redirect to add campus form
  const addCampus = () => {
    console.log("Redirect to /addCampus page");
    navigate("/addCampus");
  }
  
  //if no campus > campus length is 0
  if(allCampus.length === 0){
    return (
      <div>
        <h1>All Campus</h1>
        <div style={{textAlign:'center'}}>
          <h4 style={{fontSize:'30px'}}>No Campus here. Be the first to add one!</h4>
          <div>
            <button className='addCampusButton' onClick={addCampus}>
              <p>
              ADD 
              <br />
              New Campus
              <br />
              <MdAddHome size={120} />
              </p>
            </button>
        </div>
        </div>

      </div>

    )
  }


  return (
    <div>
      <h1>All Campuses</h1>
      <div className='allCampus'>
        <button className='addCampusButton' onClick={addCampus}>
          <p>
          ADD 
          <br />
          New Campus
          <br />
          <MdAddHome size={120} />
          </p>
        </button>
        {allCampus.map((item) => {
          return <CampusCard key={item.id} campus={item} />
        })}
      </div>
    </div>
  )
}

export default AllCampus