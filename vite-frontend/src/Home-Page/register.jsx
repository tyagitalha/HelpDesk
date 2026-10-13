import React, { useState } from 'react'
import "./register.css"
import { useNavigate, Link } from 'react-router-dom'

function Register() {

  const [username, setUsername] = useState("")
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigator = useNavigate()

  
  async function handleRegister(e) {
    e.preventDefault()

    try {
      const response = await fetch("https://helpdesk-3b70.onrender.com/api/v1/users/register", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, fullName, email, password })
      })

      const data = await response.json()
      if (!response.ok) {

        if (response.status === 400) {
          console.log("400 BLOCK RUNNING");

          alert("Username or email already exists");
          navigator("/login")
          return;
        }

        alert(data.message || "Something went wrong");
        return;
      }

      
      else {
        console.log("dashboard login");

      }

      navigator("/UserDashboard")


    } catch (error) {
      console.error("Network error:", error)
    }
  }

  return (
    <div className='regsiterBox'>
      <h2>create Account</h2>
      <form onSubmit={handleRegister} className='register-form'>
        <label htmlFor="username">Username</label>
        <input type="text" name="username" id="username" placeholder='Enter your Username' onChange={(e) => setUsername(e.target.value)} />

        <label htmlFor="fullName">FullName</label>
        <input type="text" name="fullName" id="fullName" placeholder='Enter Your Full Name' onChange={(e) => setFullName(e.target.value)} />

        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" placeholder='Enter Your Email' onChange={(e) => setEmail(e.target.value)} />

        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" placeholder='Enter Your Password' onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
      <p></p>
    </div>
  )
}

export default Register
