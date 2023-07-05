import React, { Fragment, useState } from 'react'
import { useLocation, Link } from 'react-router-dom';

//import icons
import { MdSchool } from 'react-icons/md'

function Navigate() {
    const [hover, setHover] = useState(false);

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

  //Javascript split method to get the name of the path in array
  const getLocation = pathname.split("/");

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
    </ul>
  </nav>
  </Fragment>
  )
}

export default Navigate