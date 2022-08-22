import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import LogoutButton from '../components/LogoutButton'
import { getMyBooks } from '../redux/userPostSlice'
import PostBookComponent from '../components/PostBookComponent'
import UserPreviousPostedBookComponent from '../components/UserPreviousPostedBookComponent'
import DashboardUserAndTotalBookComponent from '../components/DashboardUserAndTotalBookComponent'

const UserDashboard = () => {

  const user = useSelector(state => state.user)
  const userPost = useSelector(state => state.userPost)
  console.log(Array.isArray(userPost))//Array.isArray(state)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if(user.value === null){
      navigate('/loginuser')
      return
    }else{
      dispatch(getMyBooks())
      console.log(userPost)
    }
  },[])



  return (
    <div className='userDashboardContainer'>
        {user.value && <DashboardUserAndTotalBookComponent userPost={userPost} user={user} />}
        <PostBookComponent />
        {userPost && <UserPreviousPostedBookComponent key={userPost._id} userBooks={userPost}/>}
      <LogoutButton />
    </div>
  )
}

export default UserDashboard