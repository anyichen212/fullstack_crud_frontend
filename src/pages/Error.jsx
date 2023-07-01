import React from 'react'

function Error(props) {

  return (
    <div>
      <h1>Page Not Found</h1>
      <h2>{props.msg}</h2>
    </div>
  )
}

export default Error