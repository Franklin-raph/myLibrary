import React from 'react'
import { Link } from 'react-router-dom'

const UserPreviousPostedBookComponent = ({userBooks}) => {
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
            <div className='actions'>
                <i className='ri-pencil-fill'></i>
                <i className='ri-waste-fill'></i>
            </div>
          </div>
          ))
        )}
    </div>
  )
}

export default UserPreviousPostedBookComponent