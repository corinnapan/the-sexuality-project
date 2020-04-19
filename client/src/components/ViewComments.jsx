import React from 'react'

export default function ViewComments(props) {
  return (
    <div>
      {props.comments.map((comment) => (
        <div>
          <p>{comment.content}</p>
        </div>
      ))}
    </div>
  )
}
//can render array,strings, integers, jsx tags, but NOT OBJECTS in react