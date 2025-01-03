import React, { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import styles from "./Login.module.css";

const Login = ({ setUser }) => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            alert("entert all the feilds")
            return
        }
    
        const response = await fetch("https://youtube-mern-backend-api.onrender.com/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
              
        })
        const data = await response.json();
        if (response.ok) {
            localStorage.setItem("authToken", data.token)
            localStorage.setItem("user",JSON.stringify(data.user))
            alert("Logged in succesfully")
              navigate("/");
        } else {
            alert("Invalid email or password");
        }
      
    }

      

  return (
    <div className={styles.authContainer}>
      <div className={styles.formBox}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit} className={styles.authForm}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
