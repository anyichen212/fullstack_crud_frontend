import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllCampusThunk } from '../redux/campuses/campusesActions';

import CampusCard from '../components/CampusCard';

function AllCampus() {
  const allCampus = useSelector((state) => state.campus.allCampus);
  const dispatch = useDispatch();


  useEffect(() => {
    const fetchAllCampus = () => {
      console.log("Distpatch from FetchAllCampus");
      return dispatch(fetchAllCampusThunk());
    };
    console.log("useEffect : fetch all campus");
    fetchAllCampus();
    console.log("All Campus : ", allCampus);
  }, []);

  //loading if allCampus list is null
  if(!allCampus){
    return (
      <h2>LOADING...</h2>
    )
  }
  
  //if no campus > campus length is 0
  if(allCampus.length === 0){
    return (
      <div>
        <h1>AllCampus</h1>
        <div>No Campus here. Be the first to add one!</div>
        <div><button>All Campus</button></div>
      </div>

    )
  }


  return (
    <div>
      <h1>AllCampus</h1>
      <div>
        <div><button>All Campus</button></div>
        {allCampus.map((item) => {
          return <CampusCard key={item.id} campus={item} />
        })}
      </div>
    </div>
  )
}

export default AllCampus