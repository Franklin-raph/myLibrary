import React, { useEffect }  from 'react'
import { Link } from 'react-router-dom'
import AOS from "aos";
import "aos/dist/aos.css";


const BookCardComponent = ({aBook}) => {

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  },[])

  return (
    <div>
      <div data-aos="fade-up" className='singleBookCard'>
          <div className="userAndBookInfo">
            <div className="nameAndAvatar">
              <img src={aBook.avatar} alt="User avatar"/>
              <h4>{aBook.userName}</h4>
            </div>
            <div className='titleAndDescription'>
              <Link to={`/book/${aBook._id}`}>
                <h4>Title: {aBook.title}</h4>
              </Link>
              <p>{aBook.description.substring(0, 100)}...</p>
              <i className='bookAuthorName'>Author:{aBook.author}</i>
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