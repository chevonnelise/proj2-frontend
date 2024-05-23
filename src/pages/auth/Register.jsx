import React, { useState } from 'react';
import axios from 'axios';
import './styles.css';
import { Link } from 'react-router-dom';

export const Register = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://3000-chevonnelis-proj2backen-lqv6rdz4jy0.ws-us114.gitpod.io/api/users/register", {
        username,
        email,
        password
      });
      alert("Registration completed. Please login.");
    } catch (err) {
      console.error("Error during registration:", err);
      if (err.response && err.response.data) {
        const errorType = err.response.data.type;
        console.log("Error type:", errorType);
        if (errorType === "username-already-exists") {
          alert("Error: Username already in use.");
        } else {
          alert("Error: Trouble registering.");
        }
      } else {
        alert("Error: Unable to register.");
      }
    }
  }

  return (
    <div className="auth">
      <div className="auth-container">
        <form onSubmit={handleSubmit}>
          <h2>Register</h2>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" value={username} onChange={(e) => setUserName(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button className="register-btn" type="submit">Register</button>
          <p>Ready to login? <Link to="/auth">Login here</Link></p>
        </form>
      </div>
    </div>
  );
}

