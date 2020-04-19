import React, { Component } from 'react'

export default class CreateComment extends Component {
  state={
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
          this.props.handleCreateComment(this.state)
        }} >
          <label htmlFor="content">Content</label>
          <input type="text" name="content" id="content" value={this.state.content} onChange={this.handleChange} />
          <button>Create Comment!</button>
        </form>
      </div>
    )
  }
}
