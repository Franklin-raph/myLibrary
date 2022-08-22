import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'

import { postComment, getAllCommentsForABook } from '../redux/userCommentSlice'
import { deleteMyBook } from '../redux/userPostSlice'
import { likeAndDislikeBook } from '../redux/likeAndDislikeBookSlice'
import CommentListComponent from '../components/CommentListComponent'

const BookDetailsPage = () => {
    let { bookId } = useParams()
    const [text, setText] = useState("")
    const user = useSelector(state => state.user)
    

    

    const [userBook, setUserBook] = useState({})

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
      if(user.value === null){
        navigate('/loginuser')
        return
      }else{
        dispatch(getAllCommentsForABook(bookId))
        fetchBookDetail()
      }
    },[])

    const userBookComments = useSelector(state => state.userComment)
    const likeAndDislikePostedBook = useSelector(state => state.likeAndDislikeBook)
    console.log(likeAndDislikePostedBook.msg)
    console.log(Array.isArray(likeAndDislikePostedBook))
    console.log(userBookComments)

    const fetchBookDetail = async () => {
        const response = await fetch(`/api/v1/mylibrary/books/${bookId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${user.value.token}`
          }
        })
        const data = await response.json()
        setUserBook(data)
      }

    const handleCommentPost = () => {
        dispatch(postComment({
          user: user.value.user.name,
          text,
          bookId
        }))
        // window.location.reload()
    }

    const handleBookDelete = () => {
      dispatch(deleteMyBook(bookId))
      navigate('/userdashboard')
      window.location.reload()
    }

    const handleLikeanddislike= () => {
      dispatch(likeAndDislikeBook(bookId))
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
          {/* <div className="bookUsersReaction">
          {userBookComments && (
            <p>
              <i className="ri-message-2-line"></i>
              <span>{userBookComments.length}</span>
            </p>
            )}

          {likeAndDislikePostedBook && (
            <p>
              <i className="ri-thumb-up-line" onClick={handleLikeanddislike}></i>
              <span>{likeAndDislikePostedBook.msg}</span>
            </p>
          )}

            <p>
              <i className="ri-share-line"></i>
            </p>
          </div> */}
          <div className='actions'>
                <i className="ri-edit-2-fill"></i>
                <i className="ri-delete-bin-2-fill" onClick={() => handleBookDelete()}></i>
                {/* <i className="ri-delete-bin-2-fill" onClick={() => dispatch(deleteMyBook(userBook._id))}></i> */}
            </div>
          {/* <div className="bookComments">
            <h4>Comment Section</h4>
            {userBookComments && < CommentListComponent key={userBookComments._id} comments={userBookComments} />}
          </div>
          <div className='commentInput'>
            <input type='text' onChange={e => setText(e.target.value)} value={text} placeholder='Leave a comment'/>
            <button>
              <i className="ri-send-plane-2-fill" onClick={handleCommentPost}></i>
            </button>
          </div> */}
        </div>
      )}
    </div>
  )
}

export default BookDetailsPage