import React from 'react'
import { useSelector } from 'react-redux'

const InitialTopNav = () => {

  const user = useSelector(state => state.user)
  console.log(user)

  // if

  return (
    <div className='topNav'>
        <div>Book Share</div>
        {/* <img src={user.value.user.avatar} alt="user" /> */}
    </div>
  )
}

export default InitialTopNav