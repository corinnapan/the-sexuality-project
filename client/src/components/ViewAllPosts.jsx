import React from 'react'
import { Link } from 'react-router-dom'

export default function ViewAllPosts(props) { //list of posts 
  return (
    <div>
      <div className="view-all-posts">
        <h3>Our Stories--</h3>
        <h4>Please contribute YOUR story to OUR collection.</h4>
      </div>
      <div className="posts-grid">
        {props.posts.map((post) => (
          <div className="post" key={post.id} onClick={() => {
            props.handleClickOnPost(post.id)
          }}>
            <h5>{post.title}</h5>
            <p>{post.content.substring(0, 10)}...</p>
          </div>
        ))}
      </div>

      <div id="create-post-button">
        <Link to="/createpost">
          <button className="big-button" type="button">
            <div className="circle">
              <span className="plus-sign">+</span>
            </div>
            Create Post!
     </button>
        </Link>
      </div>


    </div>
  )
}

//return a SINGLE/ONE JSX element (can be any: p tag, fragment, div) in react (which does not exist in HTML)
//use a fragment to return JSX element for React logic, but won't give you a nested div (a div within a div. divs can be styled, not fragments). keep divs to a minimal unless you need one. can always go back and add divs, but removing is harder. 
//implicit return - doing one thing that is the return; spread across multiple lines with parentheses

{/* <h5>{post.title}</h5>  */ } // we go to dev tools to figure out properties of post, title & content