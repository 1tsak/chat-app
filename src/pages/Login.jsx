import React, { useEffect } from 'react'
import { useAuth } from '../utils/AuthContext'
import { useNavigate } from 'react-router-dom';
import icon from "../assets/icon.png"
export const Login = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    })
    useEffect(() => {
        if (user) navigate('/')
    }, [])
    const handleInputChange = (e) => {
        let name = e.target.name
        let value = e.target.name
        setCredentials({ ...credentials, [name]: value });
    }
    return (
        <div className='login-container'>
            <div className="logo-container">
                <img src={icon} alt="" />
            </div>
            <div className='form-container'>
                <form action="">
                    <div className='field-wrapper'>
                        <label htmlFor="email">Email</label>
                        <input
                            name='email'
                            type='email'
                            placeholder='Enter your email...'
                            value={credentials.password}
                            onChange={handleInputChange} />
                    </div>
                    <div className='field-wrapper'>
                        <label htmlFor="email">Password</label>
                        <input
                            name='password'
                            type='password'
                            placeholder='Enter your password...'
                            value={credentials.email}
                            onChange={handleInputChange} />
                    </div>
                    <input type="submit" />
                </form>
            </div>
        </div>
    )
}
