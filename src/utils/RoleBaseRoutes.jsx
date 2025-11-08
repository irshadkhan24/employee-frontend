import React from 'react';
import { useAuth } from '../context/authContext';
import { Navigate } from 'react-router-dom';

const RoleBaseRoutes = ({ children, requiredRole }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading ...</div>;

  // Prevent crash if user is null
  if (!user || !requiredRole.includes(user.role)) {
    return <Navigate to="/login" />;
  }

  return children;
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

