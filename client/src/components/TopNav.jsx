import React from 'react'
import { useSelector } from 'react-redux'

const TopNav = () => {

  const user = useSelector(state => state.user)

  return (
    <div className='topNav'>
        {/* <i className="ri-search-line"></i> */}
        <div>Book Share</div>
        <img src={user.value.user.avatar} alt="user" />
    </div>
  )
}

export default TopNav