import React from 'react'
import { useDispatch } from 'react-redux'
import { LOGOUT } from '../redux/userSlice'
import { Link, useNavigate } from 'react-router-dom'

const LogoutButton = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogOut = () => {
        localStorage.setItem('signedInuser', null)
        dispatch(LOGOUT(null))
        navigate('/loginuser')
        // window.location.reload();
      }

  return ( 
    <div className='logoutbtndiv'>
        <button className='logoutbtn' onClick={handleLogOut}>Logout</button>
    </div>
  )
}

export default LogoutButton