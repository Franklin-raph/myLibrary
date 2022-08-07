import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ErrorMsg from '../components/ErrorMsg'

const Register = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState(false)
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()
    const userRegisterInfo = {name, email, password }

    if(name === "" || email ==="" || password === "" || confirmPassword === ""){
      setError("Please Validate all fields")
      setTimeout(() => {
        setError(false)
      },5000)
    }else{
      const response = await fetch('http://localhost:8000/api/v1/mylibrary/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userRegisterInfo),
      headers: {
        'Content-Type':'application/json',
      }
    })
      const data = await response.json()
      console.log(data)
      console.log(response)
      if(!response.ok){
          setError(data.msg)

          setTimeout(() => {
            setError(false)
          },5000)
          
      }else{
        navigate('/')
        console.log(data)
      }
    }
  }

  return (
        <form className="signup-fields" onSubmit={handleRegister}>
            <h1>Sign up</h1>
            {error && <ErrorMsg msg={error}/>}
            <div className="inputParent">
              <input type="text" name="name" placeholder="Userame" onChange={e => setName(e.target.value)} value={name}/>
              <input type="text" name="email" placeholder="E-mail" onChange={e => setEmail(e.target.value)} value={email}/>
              <input type="password" name="password" placeholder="Create Password" onChange={e => setPassword(e.target.value)} value={password}/>
              <input type="password" name="password2" placeholder="Confirm password" onChange={e => setConfirmPassword(e.target.value)} value={confirmPassword}/>
              <input type="submit" name="signup_submit" value="Create Account" />
              <p>Already have an account? <Link to="/loginuser">Sign in</Link></p>
            </div>
        </form>

    //   </div>
    // </div>
  )
}

export default Register