import React from 'react'
import { NavLink, Route, Switch } from 'react-router-dom'


function Header(props) {
  return (

    <div>
      {
        props.currentUser
          ?
          <>
            <Switch>
              <Route exact path="/posts">
                {/* Show nothing */}
              </Route>
              <Route path="/">
                <NavLink to="/posts"><button className="big-button">View Posts!</button></NavLink>
              </Route>
            </Switch>

            <button className="big-button" onClick={props.handleLogout}>Log Out!</button>

          </>
          :
          <>
            {/* <NavLink to="/login">Login</NavLink>
            <NavLink to="/signup">Sign Up</NavLink> */}
          </>
      }

    </div>
  )
}

export default Header