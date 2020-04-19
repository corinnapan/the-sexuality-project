//vanilla java script, no jsx 
import axios from 'axios';

const baseUrl = 'http://localhost:3000'

const api = axios.create({ //create an instance of Axios that's already configured to go to local host 3000
  baseURL: baseUrl
})
//CRUD 
export const loginUser = async (loginData) => {
  const resp = await api.post('/auth/login', { auth: loginData }) //sends response
  localStorage.setItem('authToken', resp.data.token);
  api.defaults.headers.common.authorization = `Bearer ${resp.data.token}`
  return resp.data.user
}

export const registerUser = async (registerData) => {
  const resp = await api.post('/users/', { user: registerData })
  localStorage.setItem('authToken', resp.data.token);
  api.defaults.headers.common.authorization = `Bearer ${resp.data.token}`
  return resp.data.user
}

export const verifyUser = async () => {
  const token = localStorage.getItem('authToken');
  if (token) {
    api.defaults.headers.common.authorization = `Bearer ${token}`
    const resp = await api.get('/auth/verify');
    return resp.data
  }
  return false
}

export const removeToken = () => {
  api.defaults.headers.common.authorization = null;
} 

export const getPosts = async() => {
  const res = await api.get('/posts')
  return res.data 
}

export const getOnePost = async(id) =>{
  const res = await api.get(`/posts/${id}`)
  return res.data
}

export const createPost = async (newPostData) => { //does it have to be async?
  const res = await api.post('/posts', {post:newPostData} ) //post method takes two parameters: 1) where we're sending data and 2) the data that we're sending
  return res.data
}

export const deleteOnePost = async(id) =>{
  const res = await api.delete(`/posts/${id}`)
  return res.data
}

export const updatePost = async (postData,id) =>{
  const res = await api.put(`/posts/${id}`, postData)
  return res.data
}




