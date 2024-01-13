import React from "react";
import { useState } from "react";
import { useAuth } from "../utils/AuthContext";
import { Link } from "react-router-dom";
import icon from "../assets/icon.png"

export const Register = () => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password1: "",
    password2: "",
  });

  const { handleRegister } = useAuth();

  const handleInputChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setCredentials({ ...credentials, [name]: value });
    // console.log('CREDS:', credentials)
  };

  return (
    <div className="login-container">
      <div className="logo-container">
        <img src={icon} alt="" />
      </div>
      <div className="form-container">
        <p>Register</p>
        <form onSubmit={(e) => {handleRegister(e, credentials)}}>
          <div className="field-wrapper">
            <label htmlFor="name">Name</label>
            <input
              name="name"
              type="text"
              placeholder="Enter your name..."
              value={credentials.name}
              onChange={handleInputChange}
            />
          </div>
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
              name="password1"
              type="password"
              placeholder="Enter your password..."
              value={credentials.password1}
              onChange={(e) => {
                handleInputChange(e);
              }}
            />
          </div>
          <div className="field-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password2"
              placeholder="Comfirm your password..."
              value={credentials.password2}
              onChange={(e) => {
                handleInputChange(e);
              }}
            />
          </div>
          <input type="submit" value="Register" />
        </form>
        <p className="register-text">
          Already have an account? <Link to="/login">here</Link>
        </p>
      </div>
    </div>
  );
};

