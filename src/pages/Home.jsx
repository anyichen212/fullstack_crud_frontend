import React from 'react'
import { BsPostcardHeartFill } from 'react-icons/bs'

function Home() {
  return (
    <div style={{textAlign:'center'}}>
      <h1>WELCOME</h1>
      <img style={{width:'60%'}} src="https://1.bp.blogspot.com/-XKTafTy2_Bw/UOKDYzJbICI/AAAAAAAAKNY/tTeng5oVcJk/s1600/school.png" alt='Campus' />
      <h4 style={{fontSize:'50px'}}>TTP CRUD APP</h4>
      <h4><BsPostcardHeartFill /> <br /> Anyi Chen</h4>
    </div>
  )
}

export default Home