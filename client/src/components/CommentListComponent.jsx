import React from 'react'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const CommentListComponent = ({comments}) => {

    // const userBookComments = useSelector(state => state.userComment)

  return (
    <div>
        {comments && (
            comments.length ? comments.map((comment) => (
            <div key={comment._id}>
                <p className="readersComments" key={comment._id}>
                    {comment.text}
                    {/* <em>({formatDistanceToNow(new Date(comment.date), { suffix: true})}  ago)</em> */}
                </p>
            </div>
            )) : "!No Comment for this book. Be the first person to leave  a comment by using the comment field below."
        )}
    </div>
  )
}

export default CommentListComponent