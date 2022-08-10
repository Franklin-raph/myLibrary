import React, { useEffect } from 'react'

const UserProfile = () => {

    useEffect(() => {fetchUserProfile()},[])

    const fetchUserProfile = async () => {
        const response = await fetch('/api/v1/mylibrary/user/me')
        const data = await response.json()
        console.log(data)
    }

  return (
    <div className='userProfile'>UserProfile</div>
  )
}

export default UserProfile