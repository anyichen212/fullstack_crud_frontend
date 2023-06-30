import React from 'react'

export default function CampusCard(props) {
    console.log(props.campus.id);

  return (
    <div>{props.campus.name}</div>
  )
}
