import React, { Fragment, useEffect, useState } from 'react'
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { fetchAllStudentThunk } from '../redux/students/studentActions';
import { fetchAllCampusThunk } from '../redux/campuses/campusesActions';

//import icons
import { MdSchool } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux';

function Navigate() {
  const allCampus = useSelector((state) => state.campus.allCampus);
  const allStudent = useSelector((state) => state.allStudent.allStudent);
  const dispatch = useDispatch();
  const navigate = useNavigate();

    const [hover, setHover] = useState(false);
    const [search, setSearch] = useState("");
    const [campusStudent, setCampusStudent] = useState("campus");
    const [placeholder, setPlaceholder] = useState("Search(campus name)");

    useEffect(() => {
      const fetchAllCampus = () => {
        return dispatch(fetchAllCampusThunk());
      };
      fetchAllCampus();
    }, []); 

    //trigger icon hover
    const mouseEnter = () => {
        setHover(true);
    }

    const mouseLeave = () => {
        setHover(false);
    }

    //assigning location variable
  const location = useLocation();

  //destructuring pathname from location
  const { pathname } = location;

  //split method to get the name of the path in array
  const getLocation = pathname.split("/");

  //change selection betwerrn campus and student
  const selectCampusStudent = (e) => {
    setCampusStudent(e.target.value);
    if(e.target.value == "campus") {
      dispatch(fetchAllCampusThunk());
      setPlaceholder("Search(campus name)");
    } else {
      dispatch(fetchAllStudentThunk());
      setPlaceholder("Search(first and last name)");
    }
  }

  //submiting search results
  const searchSub = (e) => {
    console.log(campusStudent, search)
    let id = -1;
    if(campusStudent === "campus"){
      for(let i of allCampus){
        if(i.name.toLowerCase() == search.toLowerCase())
          id = i.id;
      }
    } else {
      for(let i of allStudent) {
        if(search.toLowerCase() == (i.firstName.toLowerCase() + " " + i.lastName.toLowerCase()))
          id = i.id;
      }
    }

    navigate(`/${campusStudent}/${id}`);
    navigate(0);
    //console.log(id);

  }


  return (
    <Fragment>
    <nav>
    <ul>
        <MdSchool  
            size='40px' 
            style ={{
                color: hover ? '#DEB887' : '#F8F8E5',
                margin: '2px 10px 2px -20px'
            }}
            onMouseEnter={mouseEnter}
            onMouseLeave={mouseLeave}
        />
      <li>
        <Link
          className={getLocation[1] === "" ? "navLinkActive" : "navLink"}
          to="/"
         >Home</Link>
      </li>
      <li>
        <Link
          className={getLocation[1] === "campus" ? "navLinkActive" : "navLink"}
          to="/campus"
        >Campuses</Link>
      </li>
      <li>
        <Link 
          className={getLocation[1] === "students" ? "navLinkActive" : "navLink"}
          to="/students"
        >Students</Link>
      </li>
      
      <div className='searchNav'>
        <select className='searchBar' name="choice" onChange={selectCampusStudent}>
          <option value="campus" >Campus</option>
          <option value="students" >Student</option>
        </select>
        <input className='searchBar' type='text' placeholder={placeholder} value={search} onChange={(e) => setSearch(e.target.value)}/>
        <button className='searchBar b' type="submit" onClick={searchSub}>Search</button>
      </div>

    </ul>
  </nav>
  </Fragment>
  )
}

export default Navigate