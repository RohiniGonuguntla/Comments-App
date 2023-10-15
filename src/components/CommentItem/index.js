// Write your code here
import {Component} from 'react'
import {formatDistanceToNow} from 'date-fns'
import './index.css'

class CommentItem extends Component {
  render() {
    const {comment, likeComment, deleteComment} = this.props
    const {
      username,
      comment: commentText,
      date,
      isLiked,
      initialClassName,
    } = comment

    return (
      <li className="comment-item">
        <p className={`initial ${initialClassName}`}>{username[0]}</p>
        <div className="comment-details">
          <div className="comm">
            <p className="comment-name">{username}</p>
            <p className="comment-time">
              {formatDistanceToNow(date, {addSuffix: true})}
            </p>
          </div>
          <p className="comment-text">{commentText}</p>
          <div className="like-delete-container">
            <button
              type="button"
              className="like-button"
              onClick={() => likeComment(comment.id)}
            >
              <img
                src={
                  isLiked
                    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
                    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'
                }
                alt={isLiked ? 'liked' : 'like'}
              />
            </button>
            <p className="text">Like</p>
            <button
              type="button"
              className="delete-button"
              data-testid="delete"
              onClick={() => deleteComment(comment.id)}
            >
              <img
                src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
                alt="delete"
              />
            </button>
          </div>
        </div>
      </li>
    )
  }
}

export default CommentItem
