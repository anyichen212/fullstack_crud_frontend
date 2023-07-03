import React from 'react'

function StudentCard(props) {
    const student = props.student;

  return (
    <div>Name: {student.firstName} {student.lastName}</div>
  )
};

export default StudentCard