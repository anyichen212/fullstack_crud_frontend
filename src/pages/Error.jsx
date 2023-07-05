import React from 'react'

function Error(props) {

  return (
    <div style={{textAlign: 'center'}}>
      <h1>Page Not Found</h1>
      <h4 style={{fontSize:'30px'}}>{props.msg}</h4>
    </div>
  )
}

export default Error