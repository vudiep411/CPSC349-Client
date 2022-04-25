import React from 'react'
import { Link, useNavigate } from "react-router-dom"
import { useState } from 'react';
import Axios from 'axios'

function Register() {
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const [registerStatus, setregisterStatus] = useState("")
const navigate = useNavigate()


const addUser = () => {
    if(!username || !password)
    {
        alert('Cannot be empty')
    }
    else
    {
        Axios.get(`http://localhost:5000/checkRegister/${username}`)
        .then((res) => {
            if(res.data.message)
            {
                setregisterStatus(res.data.message)
            }
            else{
                Axios.post('http://localhost:5000/register', {
                    username: username,
                    password: password
                }).catch((err) => {
                    console.log(err)
                })
                navigate('/login')
            }
        })
    }
}

  return (
    <>
    <div class="w-100">
      <nav class="navbar navbar-dark bg-dark">
      <a class="navbar-brand" href="/register">Register</a>
      <Link to="/login" class="btn btn-secondary">Login</Link>
    </nav>
    </div>
      <br/>
      <div class = "container">
          <div class = "row">
              <div class = "col-md-6 col-md-offset-3">  
              {registerStatus &&
			<div class="alert alert-danger" role="alert">
				{registerStatus}
			</div>}

                  <h1> Register </h1>
                  
                      <br/>
                      <div class = "form-group">
                          <label for ="username"> Username </label> :
                          <input type="text" class = "form-control" placeholder="Enter username"
                          onChange={(event) => {setUsername(event.target.value)}}/>
                      </div>
                      <br/>
                      <div class="form-group">
                          <label for="password">Password</label>: 
                          <input type="password" class="form-control" placeholder="Enter Password" 
                          onChange={(event) => {setPassword(event.target.value)}}/>
                      </div>
                      <br/>
                      <div class="form-group">
                          <div class="row">
                              <div class="col-sm-6 col-sm-offset-3">
                              <button
									class="form-control btn btn-primary" onClick={addUser}>Register</button>
                              </div>
                          </div>
                      </div>
            
          
              </div>
          </div>
      </div>
    </>
      
    )
  
}

export default Register