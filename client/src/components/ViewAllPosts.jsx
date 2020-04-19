import React from 'react'
import {Link} from 'react-router-dom'

export default function ViewAllPosts(props) { //list of posts 
  return (
    <div>
      <h3>View All Posts</h3>
      {props.posts.map((post) => (
        <div onClick={()=>{
          props.handleClickOnPost(post.id)
        }}>
          <h5>{post.title}</h5>
          <p>{post.content.substring(0, 10)}...</p>
        </div>
      ))}
      <Link to="/createpost">Create Post!</Link>
    </div>
  )
}

//return a SINGLE/ONE JSX element (can be any: p tag, fragment, div) in react (which does not exist in HTML)
//use a fragment to return JSX element for React logic, but won't give you a nested div (a div within a div. divs can be styled, not fragments). keep divs to a minimal unless you need one. can always go back and add divs, but removing is harder. 
//implicit return - doing one thing that is the return; spread across multiple lines with parentheses

{/* <h5>{post.title}</h5>  */ } // we go to dev tools to figure out properties of post, title & content