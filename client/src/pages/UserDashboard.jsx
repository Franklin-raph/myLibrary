import React from 'react'
import { Link } from 'react-router-dom'

const UserDashboard = () => {
  return (
    <div className='userDashboardContainer'>UserDashboard
        <Link to="/loginuser">Logout</Link>
    </div>
  )
}

export default UserDashboard