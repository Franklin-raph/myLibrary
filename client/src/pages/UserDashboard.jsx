import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const UserDashboard = () => {

  const navigate = useNavigate()

  const user = useSelector(state => state.user)
  useEffect(() => {
    if(user.value === null){
      navigate('/loginuser')
      return
    }
  },[])

  const handleLogOut = () => {
    localStorage.setItem('signedInuser', null)
    window.location.reload();
  }

  
  return (
    <div className='userDashboardContainer'>UserDashboard
        <Link to="/loginuser" onClick={handleLogOut}>Logout</Link>
    </div>
  )
}

export default UserDashboard