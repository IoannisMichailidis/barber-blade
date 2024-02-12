// Protect Screens from non-admin users
import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const OwnerRoute = () => {
    // get userInfo from global state
    const { userInfo } = useSelector(state => state.auth);

    // Check if the user is part of the "owner" group
    const isOwner = userInfo && userInfo.groups && userInfo.groups.some(group => group.name === 'owner');

    return (
      isOwner ? <Outlet/> : <Navigate to='/login' replace/>
  )
}

export default OwnerRoute;