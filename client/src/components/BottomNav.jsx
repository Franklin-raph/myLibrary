import React from 'react';
import { Link } from 'react-router-dom'

const BottomNav = () => {
  return (
    <>
        <div className='bottomNav'>
            <Link to='/' className='navLink'><i className="ri-home-6-line activeNav"></i></Link>
            <Link to='/userProfile' className='navLink'><i className="ri-user-6-line"></i></Link>
            {/* <Link to='' className='navLink'><i className="ri-home-6-line"></i></Link> */}
            <Link to='/userdashboard' className='navLink'><i className="ri-dashboard-line"></i></Link>
        </div>
    </>
  )
}

export default BottomNav