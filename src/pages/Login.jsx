import React, { useEffect, useState } from 'react';
import { useAuth } from '../utils/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import icon from '../assets/icon.png';

export const Login = () => {
  const { user, handleUserLogin } = useAuth();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    if (user) navigate('/');
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });

    if (name === 'password') {
      setPasswordError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (credentials.password.length < 8) {
      setPasswordError('Password should be at least 8 characters long');
      return;
    }

    // Additional form validation logic can be added here

    // Clear any previous password error
    setPasswordError('');

    // Call the handleUserLogin function if all validations pass
    handleUserLogin(e, credentials);
  };

  return (
    <div className="login-container">
      <div className="logo-container">
        <img src={icon} alt="" />
      </div>
      <div className="form-container">
        <p>Login to continue...</p>
        <form onSubmit={handleSubmit}>
          <div className="field-wrapper">
            <label htmlFor="email">Email</label>
            <input
              name="email"
              type="email"
              placeholder="Enter your email..."
              value={credentials.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="field-wrapper">
            <label htmlFor="password">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Enter your password..."
              value={credentials.password}
              onChange={handleInputChange}
            />
          </div>
          {passwordError && (
            <div className="error-message text-red-400">{passwordError}</div>
          )}
          <input type="submit" value="Login" />
        </form>
        <p className="register-text">
          Don't have an account? Register <Link to="/register">here</Link>
        </p>
      </div>
    </div>
  );
};
