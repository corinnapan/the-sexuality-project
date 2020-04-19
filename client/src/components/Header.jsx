import React from 'react'
import { NavLink } from 'react-router-dom'


function Header(props) {
  return (

    <div>
      {
        props.currentUser
          ?
          <>
            <NavLink to="/posts">View Posts!</NavLink>
            <button onClick={props.handleLogout}>Log Out!</button>
          </>
          :
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/signup">Sign Up</NavLink>
          </>
      }

    </div>
  )
}

export default Header