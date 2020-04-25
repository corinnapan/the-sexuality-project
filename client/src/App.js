import React from 'react';
import Header from './components/Header'
import './App.css';
import LandingPage from './components/LandingPage'
import SignUp from './components/SignUp'
import Login from './components/Login'
import CreatePost from './components/CreatePost'
import ViewAllPosts from './components/ViewAllPosts'
import EditPost from './components/EditPost'
import SeeOnePost from './components/SeeOnePost'
import { Route, withRouter } from 'react-router-dom'
import { registerUser, loginUser, verifyUser, removeToken, getPosts, createPost, deleteOnePost, updatePost, createComment } from './services/api-helper'

//create a route that goes to view all posts, pass down data (posts from state to view posts) and render
class App extends React.Component {
  state = {
    currentUser: null,
    posts: [],
  }

  componentDidMount() {
    this.handleVerify()
    this.handleGetPosts()
  }

  // ====================================
  // ============= Auth =================
  // ====================================

  handleSignUpSubmit = async (formData) => {
    const currentUser = await registerUser(formData)
    this.setState({ currentUser })
    this.props.history.push("/")
  }

  handleLoginSubmit = async (formData) => {
    const currentUser = await loginUser(formData)
    this.setState({ currentUser })
    this.props.history.push("/posts")
  }

  handleVerify = async () => {
    const currentUser = await verifyUser()
    this.setState({ currentUser })
  }

  handleLogout = () => {
    localStorage.removeItem("authToken");
    this.setState({ currentUser: null })
    removeToken();
    this.props.history.push("/");
  }

  // ====================================
  // ============= Post Actions =========
  // ==================================== (asynchronous api calls)
  handleGetPosts = async () => {
    const posts = await getPosts()
    this.setState({ posts })
  }

  handleCreatePost = async (postData) => {
    const newPost = await createPost(postData)
    this.setState(prevState => ({ //make a copy of state
      posts: [...prevState.posts, newPost] //adding new post to our already existing posts, but want to make sure we keep our old posts. dot dot dot dissolves old array so we don't have arrays within existing arrays. we just have one new array 
    }))
    this.props.history.push("/posts") //will send user back home after creating post instead of just staying on same page
  } //calling the function that's in api-helper that makes the API call to backend to pass info to the backend

  handleDeletePost = async (id) => { //function declaration - loses concept of this (this.anything will yield undefined). function expression like arrow function don't lose concept of this
    await deleteOnePost(id)
    this.setState(prevState => ({
      posts: prevState.posts.filter((post) => {
        return post.id !== id //return true if the id of the post does not match the id of the deleted post
      })
    }))
    this.props.history.push("/posts")//will be redirected to posts page after deleting post 
  }

  handleUpdatePost = async (postData, id) => {
    const updatedPost = await updatePost(postData, id) //api call to update just one post. this is writing the newly updated post to the backend
    this.setState(prevState => ({ //setting the state as a transformation from the previous state
      posts: prevState.posts.map((post) => {
        //match up id of one we updated 
        return post.id === parseInt(id) ? updatedPost : post
      })
    })) //lines 82 to 87 are for the frontend. 
    this.props.history.push(`/posts/${id}`)
  }

  handleCreateComment = async (postData, commentData) => {
    const updatedPost = await createComment(postData, commentData);

    // Updating the frontend via this code wasn't working because post.comments did not exist??
    // This is strange because post.comments works for SeeOnePost.
    // this.setState(prevState => ({ //setting the state as a transformation from the previous state
    //   posts: prevState.posts.map((post) => {
    //     debugger;
    //     //match up id of one we updated 
    //     return post.id === postData.id ? updatedPost : post
    //   })
    // })) //lines 82 to 87 are for the frontend. 

    window.location.reload();

  } //calling the function that's in api-helper that makes the API call to backend to pass info to the backend


  // ====================================
  // ============= Other Methods ========
  // ====================================

  handleClickOnPost = (id) => {
    this.props.history.push(`/posts/${id}`) //peass id of post when we click on button

  }

  // ====================================
  // ============= Render ===============
  // ====================================

  // <Route exact path='/' render={LandingPage} />
  render() {
    return (
      <div className="main">
        <Header
          currentUser={this.state.currentUser}
          handleLogout={this.handleLogout}
        />

        <Route exact path='/' render={() => (
          this.state.currentUser ?
            this.props.history.push('/posts') :
            <LandingPage
              currentUser={this.state.currentUser}
            />
        )} />

        <Route path='/signup' render={() => (
          <SignUp
            handleSignUpSubmit={this.handleSignUpSubmit}
          />
        )} />
        <Route path='/login' render={() => (
          <Login
            handleLoginSubmit={this.handleLoginSubmit}
          />
        )} />
        <Route path='/createpost' render={() => (
          <CreatePost
            handleCreatePost={this.handleCreatePost} //we've passed it down as a prop
          />
        )} />
        <Route exact path='/posts' render={() => (
          <ViewAllPosts
            posts={this.state.posts}
            handleClickOnPost={this.handleClickOnPost} //passed down through props to view all posts
          />
        )} />
        <Route exact path='/posts/:id' render={(props) => (
          <SeeOnePost
            {...props}
            currentUser={this.state.currentUser}
            handleDeletePost={this.handleDeletePost}
            handleCreateComment={this.handleCreateComment}
          />
        )} />
        <Route path='/posts/:id/edit' render={(props) => (
          <EditPost
            {...props}
            handleUpdatePost={this.handleUpdatePost}
          />
        )} />

      </div>
    );
  }
}

export default withRouter(App);

//option + shift + f = automatic formatting
//command + b 
