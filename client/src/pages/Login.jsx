import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Login = () => {

  const handleLogin =(e) => {
    e.preventDefault()
  }

  return (
    <form className="login-fields" onSubmit={handleLogin}>
        <h1>Sign in</h1>
                  
        <input type="email" name="email" placeholder="E-mail" />
        <input type="password" name="password" placeholder="Password" />
                  
        <input type="submit" name="signup_submit" value="Sign in" />
        <p>Don't have an account? <Link to="/registeruser">Sign up</Link></p>
    </form>
        
  )
}

export default Login