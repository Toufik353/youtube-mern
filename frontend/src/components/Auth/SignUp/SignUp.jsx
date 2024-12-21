import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SignUp.module.css";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

    const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
    
    const handleFormSubmit = async (e) => {
        e.preventDefault()
        const { username, email, password } = formData;
        if (username && email && password) {
            const response = await fetch("https://youtube-mern-backend-api.onrender.com/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, email, password }),
            })
            const data = await response.json();
            if (response.ok) {
                alert("User created successfully");
                navigate("/login");
            } else {
                alert("Error creating user");
            }
        } else {
            alert("Please fill in all fields");
        }
        
    }

  return (
    <div className={`${styles.authContainer} ${styles.centerAligned}`}>
      <div className={styles.formBox}>
        <h2>Sign Up</h2>
        <form className={styles.authForm} onSubmit = {handleFormSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            required
          />
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
          <button type="submit">Sign Up</button>
        </form>
        <p>
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
