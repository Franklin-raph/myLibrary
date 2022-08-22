import React from 'react'

const UserProfileComponent = ({user}) => {
  return (
    <div className='userProfile'>
        <img src={user.avatar} alt="Users image" />
        <h1 style={{color:'hsl(229, 31%, 21%)'}}>{user.name}</h1>
        <h2>{user.email}</h2>
        <hr style={{width:"100%"}}/>
        <div style={{display:'grid', padding:"10px 1rem", listStyle:'none'}}>
            {/* <h4>Followers: <span>{user.followers.length}</span></h4>
            <h4>Following: <span>{user.following.length}</span></h4> */}
            <i>Note: Version 2 of the app would include the following features</i>
            <ul style={{ listStyle:'number', padding:"0 1rem"}}>
              <li>Comment section</li>
              <li>Like and Dislike features</li>
              <li>Share options</li>
              <li>Search functionality</li>
              <li>and many more...</li>
            </ul>
        </div>
    </div>
  )
}

export default UserProfileComponent