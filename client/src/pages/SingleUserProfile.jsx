import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const SingleUserProfile = () => {
    let { id } = useParams()

    useEffect(() => {getUser()},[])

    const getUser = async () => {
        const response = await fetch(`/api/v1/mylibrary/allusers/user/${id}`)
        const data = await response.json()
        console.log(data)
    }
  return (
    <div className='singleUserProfile'></div>
  )
}

export default SingleUserProfile