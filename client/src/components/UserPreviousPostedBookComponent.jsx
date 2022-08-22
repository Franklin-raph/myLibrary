import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

const UserPreviousPostedBookComponent = ({userBooks}) => {
  const userPost = useSelector(state => state.userPost)
  console.log(userPost)

  return (
    <div className='UserPreviousPostedBookComponent'>
        <h3>My Previously Posted Books</h3>
        {userBooks && (
          userBooks.map((userBook) => (
          <div className='UserPreviousPostedBookContainer' key={userBook._id}>
            <Link to={`/book/${userBook._id}`}>
              <div className='UserPreviousPostedBookContainerTitle'>
                <h4>{userBook.title}</h4>
              </div>
            </Link>
          </div>
          ))
        )}
    </div>
  )
}

export default UserPreviousPostedBookComponent