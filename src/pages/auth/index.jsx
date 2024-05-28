import React, { useContext, useState } from 'react';
import axios from 'axios';
import {useCookies} from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';
import './styles.css';
import { ShopContext } from '../../context/shop-context';

export const AuthPage = () => {
  return (
    <div>
        <Login />
    </div>
  )
};

// const Register = () => {
//     const [username, setUserName] = useState("");
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");

//     const handleSubmit = async (e) => {
//         e.preventDefault()
//         try{
//         await axios.post("https://3000-chevonnelis-proj2backen-lqv6rdz4jy0.ws-us110.gitpod.io/api/users/register", {
//             username,
//             email,
//             password
//         })
//         alert("Registeration completed. Please login.")

//     }catch(err){
//         console.error("Error during registration:", err);
//             // Check the error response structure
//             if (err.response && err.response.data) {
//                 const errorType = err.response.data.type;
//                 console.log("Error type:", errorType);

//                 if (errorType === "username-already-exists") {
//                     alert("Error: Username already in use.");
//                 } else {
//                     alert("Error: Trouble registering.");
//                 }
//             } else {
//                 alert("Error: Unable to register.");
//             }
//     }
//     }
//     return (
//         <div className="auth">
//         <div className="auth-container">
//             <form onSubmit={handleSubmit}>
//                 <h2>Register</h2>
//                 <div className="form-group">
//                     <label htmlFor="username">Username:</label>
//                     <input type="text" id="username" value={username} onChange={(e)=>setUserName(e.target.value)}/>
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="email">Email:</label>
//                     <input type="email" id="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="password">Password:</label>
//                     <input type="password" id="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
//                 </div>
//                 <button className="register-btn" type="submit">Register</button>
//             </form>
//         </div>
//         </div>
//     )
// }

export const Login = () => {
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [_, setCookies] = useCookies(["access_token", "refresh_token"])

    const navigate = useNavigate();

    const {setIsAuthenticated} = useContext(ShopContext);

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
        const result = await axios.post("https://proj2-backend.onrender.com/api/users/login", {
            username,
            email,
            password
        })
        if (result.data && result.data.accessToken && result.data.user) {
            setCookies("access_token", result.data.accessToken);
            setCookies("refresh_token", result.data.refreshToken);
            localStorage.setItem("userId", result.data.user.id);
            setIsAuthenticated(true);
            navigate("/"); // Navigate to home page or any other page
        } else {
            throw new Error("Invalid response from server");
        }
    }catch(err){
        let errorMessage = "Error: Something went wrong.";

            if (err.response && err.response.data) {
                switch (err.response.data.type) {
                    case "no-user-found":
                        errorMessage = "Error: User does not exist.";
                        break;
                    case "wrong-credentials":
                        errorMessage = "Error: Invalid username or password.";
                        break
                    default:
                        errorMessage = "Error: Something went wrong.";
                }
            }

            alert(err);
    }
    }
    return (
        <div className="auth">
        <div className="auth-container">
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" value={username} onChange={(e)=>setUserName(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                <button className="login-btn" type="submit">Login</button>
                <p>Don't have an account? <Link to="/register">Register here</Link></p>
            </form>
        </div>
        </div>
    )
}
