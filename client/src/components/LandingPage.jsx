import React from 'react'
import { NavLink } from 'react-router-dom'

export default function LandingPage() {

  return (
    <div className="landing-page-layout center-text">

      <h3 className="landing-page-title">THE SEXUALITY SPECTRUM PROJECT!</h3>
      <div>
        <NavLink className="big-button spacer" to="/login">Login</NavLink>
        <NavLink className="big-button spacer" to="/signup">Sign Up</NavLink>
      </div>
      <img className="rainbow-image" src={require('./rainbow.png')} />
    </div>
  )
}
