import React, { useState, useEffect }  from 'react'

const BookCardComponent = ({allBooks}) => {
    const [allBooks, setAllBooks] = useState([])

    useEffect(() => {fetchAllBooks()},[])
  
    const fetchAllBooks = async () => {
      const response = await fetch("/api/v1/mylibrary/books/allbooks")
      const data = await response.json()
      setAllBooks(data)
    }
  return (
    <div>BookCardComponent</div>
  )
}

export default BookCardComponent