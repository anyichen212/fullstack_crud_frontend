import React from 'react'
import { useParams } from 'react-router-dom';

function Campus() {
    const {campusid} = useParams();
    console.log("On single campus page, campus id:", campusid);

  return (
    <div>Campus : {campusid}</div>
  )
}

export default Campus