import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addBook } from '../redux/userPostSlice'

const PostBookComponent = () => {

    const dispatch = useDispatch()

    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [publishedDate, setPublishedDate] = useState("")
    const [description, setDescription] = useState("")
    const [bookGenre, setBookGenre] = useState("")
    const [tags, setTags] = useState("")
    const [successMessage, setSuccessMessage] = useState("")

    const handlePostBook = async (e) => {
        e.preventDefault()
        dispatch(addBook({
            title: title,
            author: author,
            publishedDate: publishedDate,
            description: description,
            bookGenre: bookGenre,
            tags: tags
        }))
    }

  return (
    <form className='postBookContainer' onSubmit={handlePostBook}>
        <h3>Post A New Book</h3>
        <div>
            <label htmlFor="title">Title</label>
            <input placeholder='The Purple hisbiscus' type="text" className='postBookInput' onChange={e=> setTitle(e.target.value)} value={title}/>
        </div>
        <div>
            <label htmlFor="author">Author</label>
            <input placeholder='Chinua Achebe' type="text" className='postBookInput' onChange={e=> setAuthor(e.target.value)} value={author}/>
        </div>
        <div>
            <label htmlFor="publishedDate">Published Date</label>
            <input placeholder='24/02/1994' type="text" className='postBookInput' onChange={e=> setPublishedDate(e.target.value)} value={publishedDate}/>
        </div>
        <div>
            <label htmlFor="description">Book Description</label>
            <textarea placeholder='The Purple hisbiscus' className='postBookTextarea postBookInput' onChange={e=> setDescription(e.target.value)} value={description}></textarea>
        </div>
        <div>
            <label htmlFor="bookGenre">Book Genre</label>
            <input placeholder='Drama, Poetry' type="text" className='postBookInput' onChange={e=> setBookGenre(e.target.value)} value={bookGenre}/>
        </div>
        <div>
            <label htmlFor="tags">Tags</label>
            <input placeholder='play, flower' type="text" className='postBookInput' onChange={e=> setTags(e.target.value)} value={tags}/>
        </div>
        <input type="submit" value="Post Book" />
    </form>
  )
}

export default PostBookComponent