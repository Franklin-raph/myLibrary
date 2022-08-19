import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { postComment, getBookDetailComment } from '../redux/userCommentSlice'


const BookDetailsPage = () => {
    let { bookId } = useParams()
    const [bookDetail, setBookDetail] = useState([])
    const [text, setText] = useState("")
    const user = useSelector(state => state.user)
    const userPost = useSelector(state => state.userPost)
    const userBook = useSelector(state => state.userComment)

    // const { book } = userPost
    const userBookComments = useSelector(state => state.userComment.book)
    console.log()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
      if(user.value === null){
        navigate('/loginuser')
        return
      }else{
        dispatch(getBookDetailComment(bookId))
        // dispatch(readersComment())
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
    }

    const handleCommentPost = () => {
        dispatch(postComment({
          user: user.value.user.name,
          text,
          bookId
        }))
        navigate('/userdashboard')
    }
    
  return (
    <div className='bookDetails'>
      {userBook.book && (
        <div>
          <div className='bookPageInfo'>
            <h4>Title: {userBook.book.title}</h4>
            <p className="bookDescription"><span>Book Description:</span>{userBook.book.description}</p>
            <p><span>Book Genre:</span> <em>{userBook.book.bookGenre}</em> </p>
            <p><span>Book Author:</span> <em>{userBook.book.author}</em></p>
            <p><span>Published Date:</span>{userBook.book.publishedDate}</p>
            <div className="tags">
              {userBook.tags && (
                  userBook.tags.map((tag, index) => (
                    <div key={index}>
                      <p>#{tag}</p>
                    </div>
                  ))
                )}
            </div>
          </div>
          <div className="bookUsersReaction">
          {userBook.book.comments && (
            <p>
              <i className="ri-message-2-line"></i>
              <span>{userBook.book.comments.length}</span>
            </p>
            )}

          {userBook.book.likes && (
            <p>
              <i className="ri-thumb-up-line"></i>
              <span>{userBook.book.likes.length}</span>
            </p>
          )}

            <p>
              <i className="ri-share-line"></i>
            </p>
          </div>
          <div className="bookComments">
            <h4>Comment Section</h4>
            {userBook.book.comments && (
                  userBook.book.comments.length ? userBook.book.comments.map((comment) => (
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
            <input type='text' onChange={e => setText(e.target.value)} value={text} placeholder='Leave a comment'/>
            <button>
              <i className="ri-send-plane-2-fill" onClick={handleCommentPost}></i>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default BookDetailsPage