import React, { Component } from 'react'

export default class CreateComment extends Component {
  state = {
    content: ""
  }
  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
  }


  render() {
    return (
      <div>
        <form onSubmit={(e) => {
          e.preventDefault();
          const post = this.props.post;

          // todo: actually change the id.... 
          // post.comments.push({content: this.state.content}); //this.state.content);
          // this.props.handleUpdatePost(post, this.props.post.id)

          this.props.handleCreateComment(post, {comment: { content: this.state.content }});
        }} >
          <label htmlFor="content">Content</label>
          <input type="text" name="content" id="content" value={this.state.content} onChange={this.handleChange} />
          <button>Create Comment!</button>
        </form>
      </div>
    )
  }
}
