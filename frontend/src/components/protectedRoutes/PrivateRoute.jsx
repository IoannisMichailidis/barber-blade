// Protect Screens from non-logged-in users
import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
    // get userInfo from global state
    const { userInfo } = useSelector(state => state.auth);

  return (
    userInfo ? <Outlet/> : <Navigate to='/login' replace/>
  )
}

export default PrivateRoute