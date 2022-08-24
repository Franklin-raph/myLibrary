import React, { useState, useEffect } from 'react'
import {useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import UserProfileComponent from '../components/UserProfileComponent'

const SingleUserProfile = () => {
    let { id } = useParams();
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState();
    const user = useSelector(state => state.user)

    useEffect(() => {
      if(user.value === null){
        navigate('/loginuser')
        return
      }else{
        getUser()
      }
    },[])

    const getUser = async () => {
        const response = await fetch(`https://bookshareserver.herokuapp.com/api/v1/mylibrary/allusers/user/${id}`, {
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
    <div>
      {userDetails && <UserProfileComponent user={userDetails}/>}
    </div>
  )
}

export default SingleUserProfile