import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const BookDetailsPage = () => {
    let { bookId } = useParams()
    const [bookDetail, setBookDetail] = useState([])
    const [postedByUser, setPostedByUser] = useState([])

    useEffect(()=> { fetchBookDetail() },[])

    const fetchBookDetail = async () => {
        const response = await fetch(`/api/v1/mylibrary/books/${bookId}`)
        const data = await response.json()
        setBookDetail(data.book)
        setPostedByUser(data.bookWasPostedBy)
        // console.log(data)
    }

    console.log(postedByUser)

  return (
    <div>BookDetailsPage</div>
  )
}

export default BookDetailsPage