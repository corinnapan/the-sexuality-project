import React, { Component } from 'react'

export default class Login extends Component {
  state = {
    username: "",
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
      <div className="login-page-text">
        <h3>Login!</h3>
        <form onSubmit={(e) => {
          e.preventDefault()
          this.props.handleLoginSubmit(this.state)
        }} >
          <div className="sign-up-login-grid">
            <label htmlFor="username">Username</label>
            <input type="text" name="username" id="username" value={this.state.username} onChange={this.handleChange} />
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" value={this.state.password} onChange={this.handleChange} />
            <button className="big-button">Submit!</button>
          </div>
        </form>
      </div>
    )
  }
}
