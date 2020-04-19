import React, { Component } from 'react'

export default class CreatePost extends Component {
  state={
    title: "",
    content:""
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
          e.preventDefault()
          this.props.handleCreatePost(this.state)
        }} >
          <label htmlFor="title">Title</label>
          <input type="text" name="title" id="title" value={this.state.title} onChange={this.handleChange} />
          <label htmlFor="content">Content</label>
          <textarea name="content" id="content" value={this.state.content} onChange={this.handleChange} />
          <button>Create Post!</button>
        </form>
      </div>
    )
  }
}
