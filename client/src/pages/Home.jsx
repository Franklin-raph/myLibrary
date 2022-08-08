import React, { useState, useEffect } from 'react'

const Home = () => {
  const [allBooks, setAllBooks] = useState([])

  useEffect(() => {fetchAllBooks()},[])

  const fetchAllBooks = async () => {
    const response = await fetch("/api/v1/mylibrary/books/allbooks")
    const data = await response.json()

    if(response.ok){
      setAllBooks(data)
    }
  }
  console.log(allBooks)
  return (
    <div className="bookCard">
      {allBooks && allBooks.map((aBook) => ( //note we are useing a () here cos we are returning a template
        <div className='singleBookCard' key={aBook._id}>
          <div className="userAndBookInfo">
            <div className="nameAndAvatar">
              <img src={aBook.avatar} alt="User avatar"/>
              <h4>{aBook.userName}</h4>
            </div>
            <div className='titleAndDescription'>
              <h4>Title: {aBook.title}</h4>
              <p>{aBook.description.substring(0, 100)}...</p>
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
      ))}
    </div>
  )
}

export default Home