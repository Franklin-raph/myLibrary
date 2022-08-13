import React, { useEffect }  from 'react'
import { Link } from 'react-router-dom'
import AOS from "aos";
import "aos/dist/aos.css";
import formatDistanceToNow from 'date-fns/formatDistanceToNow'


const BookCardComponent = ({aBook}) => {

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  },[])
  // {formatDistanceToNow(new Date(workout.createdAt), { suffix: true})}
  return (
    <div>
      <div className='hr'></div>
      <div data-aos="fade-up" className='singleBookCard'>
          <div className="userAndBookInfo">
            <div className="nameAndAvatar">
              <img src={aBook.avatar} alt="User avatar"/>
              <h4> <Link to={`/user/${aBook.user}`} >{aBook.userName}</Link></h4>
            </div>
            <div className='titleAndDescription'>
              <h4>Title: {aBook.title}</h4>
              <p className='bookDescription'>{aBook.description.substring(0, 150)}...</p>
              <Link to={`/book/${aBook._id}`} className="readMorebtn">Read More</Link>
              <i className='bookAuthorName'>Author:{aBook.author}</i>
              <p style={{paddingTop:'10px', fontWeight:'100'}}><em>{formatDistanceToNow(new Date(aBook.createdAt), { suffix: true})}  ago</em></p>
            </div>
          </div>
          <div className="usersReaction">
            <p>
              <i className="ri-message-2-line"></i>
              <span>{aBook.comments.length}</span>
            </p>

            <p>
              <i className="ri-thumb-up-line"></i>
              <span>{aBook.likes.length}</span>
            </p>

            <p>
              <i className="ri-share-line"></i>
            </p>
          </div>
        </div>
    </div>
  )
}

export default BookCardComponent