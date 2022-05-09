import Axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { login } from '../reducers/user'

function Login() {
const [username, setUsername] = useState("")
const [password, setPassword] = useState("")
const [loginStatus, setLoginStatus] = useState("")
const navigate = useNavigate()
const dispatch = useDispatch()

Axios.defaults.withCredentials = true

const loginHandler = () => {
	 Axios.post('http://localhost:5000/login', {
		username: username,
		password: password
	}).then((response) =>{
		if(response.data.message)
		{
			setLoginStatus(response.data.message)
		}
		else{			
			sessionStorage.setItem("token", response.data.token)
			dispatch(login({
				username: username, 
				token: sessionStorage.getItem("token"),
				auth: true}))
			isAuthenticated()				
			navigate("/")					
		}
	})
}

const isAuthenticated = () => {
	
	Axios.get('http://localhost:5000/isAuth', 
	{
		headers: {
			"x-access-token": sessionStorage.getItem("token")
		}}).then((res) => {
			console.log(res)			
	})
}

useEffect(() => {
	if(sessionStorage.getItem('token'))
	{
		dispatch(login({
			username: username, 
			token: sessionStorage.getItem("token"),
			auth: true}))
		navigate("/")
	}
}, [])

  return (
    <>
  <div class="w-100">
    <nav class="navbar navbar-dark bg-dark">
    <a class="navbar-brand" href="/login">Admin Login</a>
	<Link to="/register" class="btn btn-secondary">Register</Link>
  </nav>
  </div><br/><br/>
	<div class = "container">
		<div class = "row">
			<div class = "col-md-6 col-md-offset-3">
			{loginStatus &&
			<div class="alert alert-danger" role="alert">
				{loginStatus}
			</div>}
			<h1>Sign In</h1><br/>
				<div class = "form-group">
					<label for ="username"> Username </label> :
					<input type="text" class = "form-control" placeholder="Enter username"
					onChange={e => setUsername(e.target.value)}/>
				</div><br/>
				<div class="form-group">
					<label for="password">Password</label>: <input type="password" class="form-control"
					placeholder="Enter Password" 
					onChange={e => setPassword(e.target.value)}/>
				</div><br/>
				<div class="form-group">
					<div class="row">
						<div class="col-sm-6 col-sm-offset-3">
							<button class="form-control btn btn-primary"
							onClick={loginHandler}>Login</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
  </>
    
  )
}

export default Login