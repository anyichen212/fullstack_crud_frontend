import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function CampusCard(props) {
    const navigate = useNavigate();

    const navigateToCampus = () => {
        navigate(`/campus/${props.campus.id}`);
    }

  return (
    <div onClick={navigateToCampus}>
        <h3>{props.campus.name}</h3>
        <img src={props.campus.image} alt={props.campus.name} width={200}/>
    </div>
  )
}
