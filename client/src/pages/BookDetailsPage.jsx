import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'


const BookDetailsPage = () => {
    let { bookId } = useParams()
    const [bookDetail, setBookDetail] = useState([])
    const [postedByUser, setPostedByUser] = useState([])
    const user = useSelector(state => state.user)
    const navigate = useNavigate()

    useEffect(() => {
      if(user.value === null){
        navigate('/loginuser')
        return
      }else{
        fetchBookDetail()
      }
    },[])

    const fetchBookDetail = async () => {
        const response = await fetch(`/api/v1/mylibrary/books/${bookId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${user.value.token}`
          }
        })
        const data = await response.json()
        setBookDetail(data.book)
        setPostedByUser(data.bookWasPostedBy)
        console.log(bookDetail)
    }
    console.log(bookDetail)
    // bookDetail.map((c) => {
    //   console.log(c)
    // })

    console.log(bookDetail)
    // 
  return (
    <div className='bookDetails'>
      {bookDetail && (
        <div>
          <div className='bookPageInfo'>
            <h4>Title: {bookDetail.title}</h4>
            <p className="bookDescription"><span>Book Description:</span>{bookDetail.description}</p>
            <p><span>Book Genre:</span> <em>{bookDetail.bookGenre}</em> </p>
            <p><span>Book Author:</span> <em>{bookDetail.author}</em></p>
            <p><span>Published Date:</span>{bookDetail.publishedDate}</p>
            <div className="tags">
              {bookDetail.tags && (
                  bookDetail.tags.map((tag, index) => (
                    <div key={index}>
                      <p>#{tag}</p>
                    </div>
                  ))
                )}
            </div>
          </div>
          <div className="bookUsersReaction">
          {bookDetail.comments && (
            <p>
              <i className="ri-message-2-line"></i>
              <span>{bookDetail.comments.length}</span>
            </p>
            )}

          {bookDetail.likes && (
            <p>
              <i className="ri-thumb-up-line"></i>
              <span>{bookDetail.likes.length}</span>
            </p>
          )}

            <p>
              <i className="ri-share-line"></i>
            </p>
          </div>
          <div className="bookComments">
            <h4>Comment Section</h4>
            {bookDetail.comments && (
                  bookDetail.comments.length ? bookDetail.comments.map((comment) => (
                    <div key={comment._id}>
                        <p className="readersComments">
                          {comment.text}
                          <em>({formatDistanceToNow(new Date(comment.date), { suffix: true})}  ago)</em>
                        </p>
                    </div>
                )) : "!No Comment for this book. Be the first person to leave  a comment by using the comment field below."
                
              )}
          </div>
          <div className='commentInput'>
            <input type='text' placeholder='Leave a comment'/>
            <button>
              <i className="ri-send-plane-2-fill"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default BookDetailsPage