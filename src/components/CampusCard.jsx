import React from 'react'
import { useNavigate } from 'react-router-dom'
import { deleteCampusThunk } from '../redux/campuses/campusesActions';
import { useDispatch } from 'react-redux';

export default function CampusCard(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const navigateToCampus = () => {
        navigate(`/campus/${props.campus.id}`);
    }

    //delete campus onCLick
    const deleteCampus = () => {
      dispatch(deleteCampusThunk(props.campus.id));
    }

  return (
    <div className="cCard">
      <input onClick={deleteCampus} className='xButton' type="button" value=" X "  />
      <div className="campus" onClick={navigateToCampus}>
        <h3 style={{paddingTop:'15px', marginTop:'0'}}>{props.campus.name}</h3>
        <img src={props.campus.image} alt={props.campus.name} width={300} height={187} />
      </div>
    </div>

  )
}
