import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import LogoutButton from '../components/LogoutButton'
import { VIEWPROFILE } from '../redux/userProfileSlice'
import PostBookComponent from '../components/PostBookComponent'
import UserPreviousPostedBookComponent from '../components/UserPreviousPostedBookComponent'


const UserDashboard = () => {

  const user = useSelector(state => state.user)
  console.log(user)
  const [userBooks, setUserBooks] = useState()
  const navigate = useNavigate()
  const dispatch = useDispatch()

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
        if(response.ok){
          dispatch(VIEWPROFILE(data))
          setUserBooks(data)
          console.log(data)
        }else{
          console.log(response.statusText)
        }
    }

    // console.log(userDetails.length)
    // userDetails.myBooks.map(userDetail => {
    //   return userDetail
    // })

  
  return (
    <div className='userDashboardContainer'>
        <div>
          <div className="totalBooksPosted">
            {userBooks && (
              <div className='dashBoardLayout'>
                <div className='dashBoardUser'>
                  <p>User</p>
                  <p>{user.value.user.name}</p>
                </div>
                <div className='dashBoardUser'>
                  <p>Books</p>
                  <p>{userBooks.length}</p>
                </div>
              </div>
            )}
          </div>
        </div>
        <PostBookComponent />
        <UserPreviousPostedBookComponent userBooks={userBooks}/>
      <LogoutButton />
    </div>
  )
}

export default UserDashboard