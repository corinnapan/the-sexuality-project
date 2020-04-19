import React, { Component } from 'react'
import {getOnePost} from '../services/api-helper'
export default class EditPost extends Component {
  state = {
    title: "",
    content: ""
  }
  async componentDidMount() {
    const {title, content} = await getOnePost(this.props.match.params.id)//get post that we want to edit
    this.setState({title,content})
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
        <h3>Edit Post</h3>
        <form onSubmit={(e) => {
          e.preventDefault()
          this.props.handleUpdatePost(this.state,this.props.match.params.id)
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
