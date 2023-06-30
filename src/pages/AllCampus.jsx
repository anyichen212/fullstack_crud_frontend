import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllCampusThunk } from '../redux/campuses/campusesActions';
import CampusCard from '../components/CampusCard';

function AllCampus() {
  const allCampus = useSelector((state) => state.campus.allCampus);
  const dispatch = useDispatch();
  const fetchAllCampus = () => {
    console.log("Distpatch from FetchAllCampus");
    return dispatch(fetchAllCampusThunk());
  };

  useEffect(() => {
    console.log("useEffect : fetch all campus");
    fetchAllCampus();
    console.log("All Campus : ", allCampus);
  });

  return (
    <div>
      <h1>AllCampus</h1>
      <div>
        <div><button>All Campus</button></div>
        {allCampus.map((item) => {
          return <CampusCard campus={item} />
        })}
      </div>
    </div>
  )
}

export default AllCampus