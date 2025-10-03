

import React from 'react';
import { useAuth } from '../context/authContext';
import { Navigate } from 'react-router-dom';

const RoleBaseRoutes = ({ children, requiredRole }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading ...</div>;
  }

  // If user role not matched, send them to login page
  if (!requiredRole.includes(user.role)) {
    return <Navigate to="/login" />;
  }

  // If everything is fine, show the children
  return user ? children : <Navigate to="/login" />;
};

export default RoleBaseRoutes;




/*
import React from 'react'
import {useAuth} from '../context/authContext'
import {Navigate} from 'react-router-dom' 

const RoleBaseRoutes = ({children, requiredRole}) => {
    const {user, loading} = useAuth()

    if(loading) {
        return <div>Loading ...</div>
    }

    if(!requiredRole.includes(user.role)) {
       return <Navigate to="/unauthorized" />

    }
    return user ? children : <Navigate to="/login" />

}

export default RoleBaseRoutes 
*/

