import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AddEmployee from './pages/AddEmployee';
import React from "react"
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import { PrivateRoute } from './checkAuth/PrivateRoute';

function App() {


  return (
    <div className="App">
       <Router> 
         
        <Routes>
          <Route exact path="/" element={<PrivateRoute>
            <Home/>
          </PrivateRoute>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/create" element={<PrivateRoute>
            <AddEmployee/>
          </PrivateRoute>}/>
          <Route path="/update/:id" element={<PrivateRoute>
            <AddEmployee/>
          </PrivateRoute>}/>
          <Route path="/register" element={<Register/>}/>
        </Routes> 
        
    </Router>
    </div>
  );
}

export default App;
