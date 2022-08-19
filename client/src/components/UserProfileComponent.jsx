import React from 'react'

const UserProfileComponent = ({user}) => {
  return (
    <div className='userProfile'>
        <img src={user.avatar} alt="Users image" />
        <h1 style={{color:'hsl(229, 31%, 21%)'}}>{user.name}</h1>
        <h2>{user.email}</h2>
        <hr style={{width:"100%"}}/>
        <div>
            <h4>Followers: <span>{user.followers.length}</span></h4>
            <h4>Following: <span>{user.following.length}</span></h4>
        </div>
    </div>
  )
}

export default UserProfileComponent