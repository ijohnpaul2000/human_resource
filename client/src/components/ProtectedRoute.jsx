import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import NotAuthenticated from '../pages/NotAuthenticated';

const ProtectedRoute = ({ allowedRoles }) => {

    const currentUserLevel = useSelector((state) => state.auth.user.user_level);
    let location = useLocation();

    //TODO: Pacheck boss hshs
    if(currentUserLevel === null) 
        return <NotAuthenticated />

    // Role Checker
    return allowedRoles.find((role) => currentUserLevel === role) ? (
        <Outlet/>
    ) : (currentUserLevel === "admin" || currentUserLevel === "super_user" || currentUserLevel === "user" || currentUserLevel === "applicant") ? (
        <Navigate to={"*"} state={{ from: location }} replace />
    ) : (
        <Navigate to={"*"} state={{ from: location}} replace />
    );

}

export default ProtectedRoute