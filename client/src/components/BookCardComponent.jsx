import React, { useEffect }  from 'react'
import { Link } from 'react-router-dom'
import AOS from "aos";
import "aos/dist/aos.css";
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useDispatch } from 'react-redux';
import { likeAndDislikeBook } from '../redux/likeAndDislikeBookSlice'


const BookCardComponent = ({aBook}) => {

  const dispatch = useDispatch()
  useEffect(() => {
    // AOS.init();
    // AOS.refresh();
  },[])

  const handleLikeanddislike= () => {
    dispatch(likeAndDislikeBook(aBook._id))
  }

  // {formatDistanceToNow(new Date(workout.createdAt), { suffix: true})}
  return (
    <div>
      <div className='hr'></div>
      <div className='singleBookCard'>
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
              <p style={{paddingTop:'10px', color:'#000', textAlign:'right', fontWeight:'400'}}><em>{formatDistanceToNow(new Date(aBook.createdAt), { suffix: true})}  ago</em></p>
            </div>
          </div>
          {/* <div className="usersReaction">
            <p>
              <i className="ri-message-2-line"></i>
              <span>{aBook.comments.length}</span>
            </p>

            <p>
              <i className="ri-thumb-up-line" onClick={handleLikeanddislike}></i>
              <span>{aBook.likes.length}</span>
            </p>

            <p>
              <i className="ri-share-line"></i>
            </p>
          </div> */}
        </div>
    </div>
  )
}

export default BookCardComponent