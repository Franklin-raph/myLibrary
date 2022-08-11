import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const UserProfile = () => {

  const navigate = useNavigate()

  const user = useSelector(state => state.user)
  useEffect(() => {
    if(user.value === null){
      navigate('/loginuser')
      return
    }else{
      fetchUserProfile()
    }
  },[])


    const fetchUserProfile = async () => {
        const response = await fetch('/api/v1/mylibrary/user/me', {
          method: "GET",
          headers: {
            Authorization: `Bearer ${user.value.token}`
          }
        })
        const data = await response.json()
        console.log(data)
    }

  return (
    <div className='userProfile'>UserProfile</div>
  )
}

export default UserProfile