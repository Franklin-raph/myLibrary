import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import UserProfileComponent from '../components/UserProfileComponent'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import LogoutButton from '../components/LogoutButton'

const UserProfile = () => {

  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState();
  const user = useSelector(state => state.user)

  useEffect(() => {
    if(user.value === null){
      navigate('/loginuser')
      return
    }else{
      getMyProfile()
    }
  },[])

  const getMyProfile = async () => {
      const response = await fetch('/api/v1/mylibrary/user/me', {
        method: "GET",
        headers: {
          Authorization: `Bearer ${user.value.token}`
        }
      })
      console.log(response)
      const data = await response.json()
      if(response.ok){
        setUserDetails(data)
        console.log(data)
      }else{
        console.log(response.statusText)
      }
  }

  console.log(userDetails)

return (
  <div className="userProfilePage">
    {userDetails && <UserProfileComponent user={userDetails}/>}
    <LogoutButton />
  </div>
)
}
export default UserProfile