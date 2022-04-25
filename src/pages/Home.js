import React, { useEffect } from 'react'
import Axios from 'axios'
import { useState } from 'react';
import {Link} from "react-router-dom";
import { logout } from '../reducers/user'
import { useDispatch } from 'react-redux'

function Home() {
  const [employeeList, setEmployeeList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const dispatch = useDispatch()
  useEffect(() => {getEmployee()}, [])
  
  const getEmployee = () => {
      Axios.get('http://localhost:5000/employees')
      .then((response) => {
        setEmployeeList(response.data)
      })
  }
  
  const deleteEmployee = (id) => {   
      Axios.delete(`http://localhost:5000/delete/${id}`)   
      setEmployeeList(employeeList.filter(e => e.id !== id))
    
  }
  
  const logoutHandler = () => {
    Axios.get('http://localhost:5000/logout')
    dispatch(logout())
    sessionStorage.removeItem("user")
    sessionStorage.clear();
    window.location.href = "/login";
  }
  
    return (
        <>    
      <div class="w-100">
      <nav class="navbar navbar-dark bg-primary">
      <form class="form-inline">
        <div class="md-form my-0">
          <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"
          onChange={event => {setSearchTerm(event.target.value)
          }}/>
        </div>
      </form>
  
      <button onClick={logoutHandler} className="btn btn-danger">Logout</button>
    </nav>
    </div>
      <br></br>
      <div class="container">
      <h1>Employees List</h1>
      <br/>
      <Link to="/create" class="btn btn-primary">Add Employee</Link>
      <br/>
      <br/>
      <table border="3" className = "table table-striped table-responsive-md">
        <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Phone Number</th>
              <th scope="col">Supervisors</th>
              <th scope="col">Action</th>
            </tr>
          </thead>   
          <tbody>
          
      {employeeList.filter((val) => {
        const com = val.name + val.id + val.supervisors
        if(searchTerm === "") {
          return val
        } else if (com.toString().toLowerCase().includes(searchTerm.toLowerCase())) {
          return val
        }
      }).map((val, key) => {
          return (
              <tr>
              <th>{val.id}</th>
              <td>{val.name}</td>
              <td>{val.phone_number}</td>
              <td>{val.supervisors}</td>
              <td>
              <div class="btn-toolbar">
                <Link to={`/update/${val.id}`}>
                  <button class="btn mr-2 btn-primary">Update</button>
                </Link>
                  <button onClick={() => deleteEmployee(val.id)} class="btn btn-danger">Delete</button>
                </div>
              </td>
              </tr>
        )     
        })}      
         </tbody>
         </table>
         </div>
         </>
    )
}

export default Home