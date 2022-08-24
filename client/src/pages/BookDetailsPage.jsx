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

    // const userBookComments = useSelector(state => state.userComment)
    // const likeAndDislikePostedBook = useSelector(state => state.likeAndDislikeBook)
    // console.log(likeAndDislikePostedBook.msg)
    // console.log(Array.isArray(likeAndDislikePostedBook))
    // console.log(userBookComments)

    const fetchBookDetail = async () => {
        const response = await fetch(`https://bookshareserver.herokuapp.com/api/v1/mylibrary/books/${bookId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${user.value.token}`
          }
        })
        const data = await response.json()
        setUserBook(data)
        console.log(data)
      }
      // console.log(userBook.book.user)

      // if(userBook.book.user !== userBook.bookWasPostedBy._id){
      //   console.log("Not Equal")
      // }else{
      //   console.log("Equal")
      // }
      // console.log(user.value)

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

    const handleBookEdit = () => {

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
                <button onClick={() => handleBookEdit()}>
                  <p>Edit <i className="ri-edit-2-fill"></i></p>
                </button>
                <button onClick={() => handleBookDelete()}>
                  <p>Delete <i className="ri-delete-bin-2-fill"></i></p>
                </button>
                {/* <i className="ri-delete-bin-2-fill" onClick={() => dispatch(deleteMyBook(userBook._id))}></i> */}
            </div>
            <i style={{color:'grey', fontSize:'12px'}}>Note: You can only <span style={{fontWeight:'bold', color:'#af7e00'}}>EDIT</span> or <span style={{fontWeight:'bold', color:'#ff5768'}}>DELETE</span> your own post.</i>
        </div>
      )}
    </div>
  )
}

export default BookDetailsPage