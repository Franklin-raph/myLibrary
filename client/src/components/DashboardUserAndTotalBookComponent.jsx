import React from 'react'

const DashboardUserAndTotalBookComponent = ({userPost, user}) => {
  return (
    <div>
        <div>
          <div className="totalBooksPosted">
            {userPost && (
              <div className='dashBoardLayout'>
                <div className='dashBoardUser'>
                  <p>User</p>
                  <p>{user && user.value.user.name}</p>
                </div>
                <div className='dashBoardUser'>
                  <p>Books</p>
                  <p>{userPost.length}</p>
                </div>
              </div>
            )}
          </div>
        </div>
    </div>
  )
}

export default DashboardUserAndTotalBookComponent