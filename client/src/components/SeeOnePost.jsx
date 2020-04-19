import React, { Component } from 'react'
import { getOnePost } from '../services/api-helper'
import ViewComments from './ViewComments'

export default class SeeOnePost extends Component {
  state = {
    post: null
  }

  async componentDidMount() {
    const post = await getOnePost(this.props.match.params.id)
    this.setState({ post })
  }

  render() {
    const { currentUser, handleDeletePost } = this.props
    const { post } = this.state
    return (
      <div>
        {post && (
          <div>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            {currentUser && currentUser.id === post.user_id && (
              <div>
                <button onClick={() => { this.props.history.push(`/posts/${post.id}/edit`) }}>Edit</button>
                <button onClick={() => { handleDeletePost(post.id) }}>Delete</button>
              </div>
            )}
            <ViewComments
              comments={post.comments}
            />
          </div>
        )}
      </div>
    )
  }
}

//boolean short circuit/guard operator
