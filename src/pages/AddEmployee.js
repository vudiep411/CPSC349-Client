import React, { useEffect } from "react"
import { useState } from 'react';
import Axios from 'axios'
import {Link, useParams, useNavigate } from "react-router-dom";



function AddEmployee(props) {

const [name, setName] = useState("");
const [phone_number, setPhone] = useState("");
const [supervisors, setSuperVisors] = useState("");    
  
const {id} = useParams();
const navigate = useNavigate()

useEffect(() => {
  if(id){
    getSingleUser(id);
    
  }
}, [id])

const getSingleUser = (id) => {
  Axios.get(`http://localhost:5000/${id}`)
  .then((results) => {
    setName(results.data[0].name)
    setPhone(results.data[0].phone_number)
    setSuperVisors(results.data[0].supervisors)
  })
}


const handleSubmit = (e) => {
  e.preventDefault()
  if(!name || !phone_number || !supervisors)
  {
    window.alert("Value can't be empty")
  }
  else if(!id)
  {
    addEmployee()
    setTimeout(() => navigate('/'), 500)
  }
  else{
    updateEmployee(id)
    setTimeout(() => navigate('/'), 500)
  }
}

const addEmployee = () => {
    Axios.post('http://localhost:5000/create', { 
    name: name, 
    phone_number : phone_number,
    supervisors: supervisors})
}

const updateEmployee = (id) => {
  Axios.put(`http://localhost:5000/update/${id}`, {
    name: name,
    phone_number : phone_number,
    supervisors: supervisors,
    id: id
  })
}
  return (
    <>
    <div class="container">
		<h1>Employee Management System</h1>
		<hr/>
		<br/>
		<h2>Save Employee</h2>
    <br/>
		<form onSubmit={handleSubmit}>
			  <input type="text" placeholder="Name" class="form-control mb-4 col-4"
             onChange={(event) => {setName(event.target.value)}} defaultValue={name}/>
				
				<input type="text" placeholder="Phone" class="form-control mb-4 col-4"
                 onChange={(event) => {setPhone(event.target.value)}} defaultValue={phone_number}/>
				
				<input type="text" placeholder="Supervisors" class="form-control mb-4 col-4"
                 onChange={(event) => {setSuperVisors(event.target.value)}} defaultValue={supervisors}/>
				<br/>
				<button class="btn btn-info col-2" type="submit" value="Add"> Save</button>
        </form>
		<br/>
		<hr/>
		<Link to="/"> Back to Employee List</Link>
	</div>
    </>
  )
}



export default AddEmployee
