import React from 'react'
import { Link } from 'react-router-dom'

const UserPreviousPostedBookComponent = ({userBooks}) => {
  return (
    <div className='UserPreviousPostedBookComponent'>
        <h3>My Previously Posted Books</h3>
        {userBooks && (
          (userBooks.reverse()).map((userBook) => (
            <Link to={`/book/${userBook._id}`} key={userBook._id}>
              <div  className='UserPreviousPostedBookContainer'>
                <h2>{userBook.title}</h2>
                <div className='actions'>
                  <i>edit</i>
                  <i>Del</i>
                </div>
              </div>
            </Link>
          ))
        )}
    </div>
  )
}

export default UserPreviousPostedBookComponent