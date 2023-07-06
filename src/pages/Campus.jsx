import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { redirect, useNavigate, useParams } from 'react-router-dom';
import { deleteCampusThunk, fetchCampusThunk } from '../redux/campuses/campusesActions';
import Error from './Error';
import StudentButton from '../components/StudentButton';
import Footer from '../components/Footer';
import { editStudentThunk, fetchAllStudentThunk } from '../redux/students/studentActions';

function Campus() {
  const singleCampus = useSelector((state) => state.singleCampus);
  const allStudent = useSelector((state) => state.allStudent.allStudent);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [studentId, setStudentId] = useState(-1);
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
  }, [allStudent]);

  //fetch all student after campus is fetch
  useEffect(() => {
    dispatch(fetchAllStudentThunk());
  }, []);

  //sort student into alphabetic order by first name > last name
  function sortByKey(array, key, key2) {
    return array.sort(function(a, b) {
        var x = a[key] + a[key2]; var y = b[key] + [key2];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
  }

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

  //add a new student to campus
  const addStudentToCampus = () => {
    if(studentId !== -1){
      const obj = {campusId : campusid}
      dispatch(editStudentThunk(obj, studentId));
      navigate(0);
    }
  }

  console.log("Single Campus : ", singleCampus);

  //loading if campus is null
  if(loading){
    return <h1>LOADING...</h1>
  }
  else if(!singleCampus){
    return (
      <Error msg ={`Not a valid campus.`}/>
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
              <div>
                <select
                  style={{
                    margin: '5px',
                    fontSize: '18px',
                    borderRadius: '10px',
                    padding: '5px 15px'
                    }}
                  onChange={(e) => setStudentId(e.target.value)}>
                  <option key={-1} value={-1}>None</option>
                  {
                    sortByKey(allStudent,"firstName","lastName").map((item) => {
                      return <option key={item.id} value={item.id} >
                        {item.firstName} {item.lastName}
                      </option>
                    })
                  }
                </select>
                <button className="addButton" onClick={addStudentToCampus}>Add</button>
              </div>
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
        <Footer />
      </div>
    )
  }
}

export default Campus