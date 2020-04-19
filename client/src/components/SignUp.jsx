import React, { Component } from 'react'

export default class SignUp extends Component {
  state = {
    username: "",
    email: "",
    password: ""
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
        <h3>Sign Up!</h3>
        <form onSubmit={(e) => {
          e.preventDefault()
          this.props.handleSignUpSubmit(this.state)
        }} >
          <label htmlFor="username">Username</label>
          <input type="text" name="username" id="username" value={this.state.username} onChange={this.handleChange} />
          <label htmlFor="email">Email</label>
          <input type="text" name="email" id="email" value={this.state.email} onChange={this.handleChange} />
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" value={this.state.password} onChange={this.handleChange} />
          <button>Submit!</button>
        </form>
      </div>
    )
  }
}
