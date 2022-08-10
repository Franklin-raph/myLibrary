import React, { useState, useEffect } from 'react'
import {useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import BookCardComponent from '../components/BookCardComponent'
import CarouselComponent from '../components/CarouselComponent'

const Home = () => {
  const [allBooks, setAllBooks] = useState([])
  const navigate = useNavigate()
  const user = useSelector(state => state.user)
  console.log(user)

  useEffect(() => {
    if(user.value === null){
      navigate('/loginuser')
    }
    console.log((localStorage.getItem('signedInuser')))
    fetchAllBooks()
  },[])


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