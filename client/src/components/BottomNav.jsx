import React from 'react';
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'


const BottomNav = () => {
  const user = useSelector(state => state.user)

  return (
    <>
      <div className='bottomNav'>
        <Link to='/userdashboard' className='navLink'><i className="ri-dashboard-line"></i></Link>
        <Link to='/myProfile' className='navLink'><i className="ri-user-6-line"></i></Link>
        <Link to='/' className='navLink'><i className="ri-home-6-line activeNav"></i></Link>
      </div>
    </>
  )
}

export default BottomNav