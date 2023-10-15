import {Component} from 'react'
import {v4} from 'uuid'
import './index.css'
import CommentItem from '../CommentItem'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

// Write your code here

class Comments extends Component {
  state = {
    username: '',
    comment: '',
    commentsList: [],
    commentCount: 0,
  }

  handleInputChange = event => {
    const {name, value} = event.target
    this.setState({[name]: value})
  }

  onAddComment = event => {
    event.preventDefault()

    const {username, comment, commentCount} = this.state

    const initialBackgroundColorClassName = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.floor(Math.random() * initialContainerBackgroundClassNames.length)
      ]
    }`

    const newComment = {
      id: v4(),
      username,
      comment,
      date: new Date(),
      isLiked: false,
      initialClassName: initialBackgroundColorClassName,
    }

    this.setState(prevState => ({
      commentsList: [...prevState.commentsList, newComment],
      username: '',
      comment: '',
      commentCount: commentCount + 1,
    }))
  }

  likeComment = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(comment => {
        if (comment.id === id) {
          return {...comment, isLiked: !comment.isLiked}
        }
        return comment
      }),
    }))
  }

  deleteComment = id => {
    const {commentCount} = this.state
    this.setState(prevState => ({
      commentsList: prevState.commentsList.filter(comment => comment.id !== id),
      commentCount: commentCount - 1,
    }))
  }

  render() {
    const {username, comment, commentsList, commentCount} = this.state

    return (
      <div className="comments-app-container">
        <div className="sub-container">
          <div className="comments-section">
            <h1>Comments</h1>
            <p>Say something about 4.0 Technologies</p>
            <form onSubmit={this.onAddComment}>
              <div className="comments-inputs-container">
                <input
                  type="text"
                  placeholder="Your Name"
                  name="username"
                  value={username}
                  onChange={this.handleInputChange}
                  className="name-input"
                />
                <textarea
                  placeholder="Your Comment"
                  name="comment"
                  value={comment}
                  onChange={this.handleInputChange}
                  className="comment-input"
                />
              </div>
              <button type="submit" className="add-comment-button">
                Add Comment
              </button>
            </form>
          </div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
            alt="comments"
            className="comments-image"
          />
        </div>
        <p>
          <span className="comm-count">{commentCount}</span> Comments
        </p>
        <ul className="comments-list">
          {commentsList.map(commentItem => (
            <CommentItem
              key={commentItem.id}
              comment={commentItem}
              likeComment={this.likeComment}
              deleteComment={this.deleteComment}
            />
          ))}
        </ul>
      </div>
    )
  }
}

export default Comments
