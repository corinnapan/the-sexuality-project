import React, { Component } from 'react'

export default class CreatePost extends Component {
  state = {
    title: "",
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
      <div className="center-title-content">
        <form onSubmit={(e) => {
          e.preventDefault()
          this.props.handleCreatePost(this.state)
        }} >
          {/* this grid has 6 children elements */}
          <div className="title-content-grid">

            <label htmlFor="title">Title</label>
            <input type="text" name="title" id="title" value={this.state.title} onChange={this.handleChange} />
            <label htmlFor="content">Content</label>
            <textarea className="content-box" name="content" id="content" value={this.state.content} onChange={this.handleChange} />
            <div></div>
            <button className="big-button" style={{ 'margin': '0 auto' }}>Create Post!</button>
          </div>
        </form>
      </div>
    )
  }
}
