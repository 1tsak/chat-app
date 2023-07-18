import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

export const Protected = () => {
    const user = false;
    return (
        <>
            {user ? <Outlet /> : <Navigate to='/login' />}
        </>
    )
}
