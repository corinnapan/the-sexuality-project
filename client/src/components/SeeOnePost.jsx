import React, { Component } from 'react'
import { getOnePost } from '../services/api-helper'
import ViewComments from './ViewComments'
import CreateComment from './CreateComment'


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
            <div className="box-around-one-post">
            <h3>Title: {post.title}</h3>
            <p>My story: {post.content}</p>
            </div>
            {currentUser && currentUser.id === post.user_id && (
              <div>
                <button onClick={() => { this.props.history.push(`/posts/${post.id}/edit`) }}>Edit</button>
                <button onClick={() => { handleDeletePost(post.id) }}>Delete</button>
              </div>
            )}
            <ViewComments
              comments={post.comments}
            />
            <CreateComment post={post}
            handleCreateComment={this.props.handleCreateComment}
            />
          </div>
        )}
      </div>
    )
  }
}

//boolean short circuit/guard operator
