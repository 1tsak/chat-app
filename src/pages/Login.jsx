import React, { useEffect } from 'react'
import { useAuth } from '../utils/AuthContext'
import { useNavigate } from 'react-router-dom';


export const Login = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        if (user) navigate('/')
    }, [])
    return (
        <div>Login</div>
    )
}
