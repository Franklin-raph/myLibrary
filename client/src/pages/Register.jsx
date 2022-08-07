import React from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
  return (
    <div>
        <div id="signup-box">
        <div className="signup-fields">
          <h1>Sign up</h1>
          
          <input type="text" name="firstname" placeholder="Firstname" />
          <input type="text" name="lastname" placeholder="Lastname" />
          <input type="email" name="email" placeholder="E-mail" />
          <input type="password" name="password" placeholder="Create Password" />
          <input type="password" name="password2" placeholder="Confirm password" />
          <input type="submit" name="signup_submit" value="Create Account" />
          <p>Already have an account? <Link to="/loginuser">Sign in</Link></p>
        </div>

      </div>
    </div>
  )
}

export default Register