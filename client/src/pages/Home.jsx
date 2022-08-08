import React, { useState, useEffect } from 'react'
import BookCardComponent from '../components/BookCardComponent'
import CarouselComponent from '../components/CarouselComponent'

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



  return (
    <>
      <CarouselComponent />
      <div className="bookCard">
        {allBooks && allBooks.map((aBook) => ( //note we are useing a () here cos we are returning a template
          <BookCardComponent key={aBook._id} aBook={aBook}/>
        ))}
      </div>
    </>
  )
}

export default Home