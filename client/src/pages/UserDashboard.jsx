import React from 'react'
import { Link } from 'react-router-dom'

const UserDashboard = () => {

  const handleLogOut = () => {
    localStorage.setItem('signedInuser', null)
  }
  
  return (
    <div className='userDashboardContainer'>UserDashboard
        <Link to="/loginuser" onClick={handleLogOut()}>Logout</Link>
    </div>
  )
}

export default UserDashboard