import React, { Fragment } from 'react'
import { useLocation, Link } from 'react-router-dom';

function Navigate() {
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
        >Campus</Link>
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