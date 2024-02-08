// Protect Screens from non-admin users
import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminRoute = () => {
    // get userInfo from global state
    const { userInfo } = useSelector(state => state.auth);

  return (
    userInfo && userInfo.isAdmin ? <Outlet/> : <Navigate to='/login' replace/>
  )
}

export default AdminRoute;