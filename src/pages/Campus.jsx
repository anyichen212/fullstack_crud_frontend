import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { redirect, useNavigate, useParams } from 'react-router-dom';
import { deleteCampusThunk, fetchCampusThunk } from '../redux/campuses/campusesActions';
import Error from './Error';
import StudentButton from '../components/StudentButton';

function Campus() {
  const singleCampus = useSelector((state) => state.singleCampus);
  //const allStudent = useSelector((state) => state.allStudent);
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
        .then(e => { setLoading(false) });
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
        <div style={{marginTop: "-16px"}}>
          <img 
            style={{
              width:"100%", 
              objectFit:"cover", 
              borderBottom:"5px dotted #6D5B76"
              }} 
            src={singleCampus.image} 
            alt={singleCampus.name} 
            height={400}/>
          <div style={{display: 'flex', justifyContent:"space-between", flexWrap:"wrap"}}>
            <h1 style={{fontSize:'70px'}}>{singleCampus.name}</h1>
            <div style={{textAlign: 'center'}}>
              <button className="singleButton" onClick={editCampus}>Edit</button>
              <button className="singleButton" onClick={deleteCampus}>Delete</button>
            </div>
          </div>
          <div className="campusText">
            <p>"{singleCampus.description}"</p>
            <div>
              <h2>Address</h2>
              <h4>{singleCampus.address} <br /> {singleCampus.city}, {singleCampus.state} {singleCampus.zip} <br /> {singleCampus.country}</h4>
            </div>
            <div>
              <h2>Students</h2>
              {
                singleCampus.students && singleCampus.students.length !== 0
                ? singleCampus.students.map((student) => {
                  return <StudentButton student={student} />
                })
                : <h4>No Students From This Campus Is In The System Yet.</h4>
              }
            </div>
            <p></p>
          </div>
        </div>
      </div>
    )
  }
}

export default Campus