import React from 'react'
import { NavLink } from 'react-router-dom'

export default function LandingPage() {

  return (
    <div className="landing-page-layout">

      <h3>THE SEXUALITY SPECTRUM PROJECT!</h3>
      <div>
        <NavLink className="big-button spacer" to="/login">Login</NavLink>
        <NavLink className="big-button spacer" to="/signup">Sign Up</NavLink>
      </div>

      <img src={require('./rainbow.png')} />


    </div>
  )
}
