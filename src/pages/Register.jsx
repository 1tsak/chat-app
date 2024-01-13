import React, { useState } from "react";
import { useAuth } from "../utils/AuthContext";
import { Link } from "react-router-dom";
import icon from "../assets/icon.png";

export const Register = () => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password1: "",
    password2: "",
  });

  const [passwordError, setPasswordError] = useState("");
  const [formError, setFormError] = useState("");

  const { handleRegister } = useAuth();

  const handleInputChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setCredentials({ ...credentials, [name]: value });

    if (name === "password1" || name === "password2") {
      setPasswordError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (credentials.password1.length < 8) {
      setPasswordError("Password should be at least 8 characters long");
      return;
    }

    if (credentials.password1 !== credentials.password2) {
      setPasswordError("Passwords do not match");
      return;
    }

    // Additional form validation logic can be added here

    // Clear any previous form errors
    setFormError("");

    // Call the handleRegister function if all validations pass
    handleRegister(e, credentials);
  };

  return (
    <div className="login-container">
      <div className="logo-container">
        <img src={icon} alt="" />
      </div>
      <div className="form-container">
        <p>Register</p>
        <form onSubmit={handleSubmit}>
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
              onChange={handleInputChange}
            />
          </div>
          <div className="field-wrapper">
            <label htmlFor="password">Confirm Password</label>
            <input
              type="password"
              name="password2"
              placeholder="Confirm your password..."
              value={credentials.password2}
              onChange={handleInputChange}
            />
          </div>
          {passwordError && (
            <div className="error-message text-red-400">{passwordError}</div>
          )}
          {formError && <div className="error-message">{formError}</div>}
          <input type="submit" value="Register" />
        </form>
        <p className="register-text">
          Already have an account? <Link to="/login">here</Link>
        </p>
      </div>
    </div>
  );
};
