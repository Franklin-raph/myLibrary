import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import UserProfileComponent from '../components/UserProfileComponent'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { VIEWPROFILE } from '../redux/userSlice'
import LogoutButton from '../components/LogoutButton'

const UserProfile = () => {

  const [userDetails, setUserDetails] = useState()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const user = useSelector(state => state.user.value.user)
  // const user = useSelector(state => state.user.value)  ===> If i would ever user the token for anything in the future i would use this
  console.log(user)
  useEffect(() => {
    if(user === null){
      navigate('/loginuser')
      return
    }else{
      // fetchUserProfile()
    }
  },[])


    // const fetchUserProfile = async () => {
    //     const response = await fetch('/api/v1/mylibrary/user/me', {
    //       method: "GET",
    //       headers: {
    //         Authorization: `Bearer ${user.value.token}`
    //       }
    //     })
    //     const data = await response.json()
    //     if(response.ok){
    //       // dispatch(VIEWPROFILE(data))
    //       setUserDetails(data)
    //     }else{
    //       console.log(response.statusText)
    //     }
    // }

    // console.log(userDetails.user.name)

  return (
    <div>
      <UserProfileComponent user={user}/>
      <LogoutButton />
    </div>
  )
}

export default UserProfile