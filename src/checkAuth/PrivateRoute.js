import { Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import React from 'react';

export function PrivateRoute({children}) {
const user = useSelector((state) => state.user.value)
const auth = user.auth
return auth ? children : <Navigate to="/login"/>
}

