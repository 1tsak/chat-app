import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../utils/AuthContext';

export const Protected = () => {
    const { user } = useAuth();
    return (
        <>
            {user ? <Outlet /> : <Navigate to='/login' />}
        </>
    )
}
