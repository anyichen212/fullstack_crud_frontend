import React from 'react'
import { useParams } from 'react-router-dom';

function Student() {
    const {studentid} = useParams();
    console.log("On single student page, student id:", studentid);

  return (
    <div>Student : {studentid}</div>
  )
}

export default Student