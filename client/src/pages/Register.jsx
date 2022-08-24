import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ErrorMsg from '../components/ErrorMsg'
import { useDispatch } from 'react-redux'
import { LOGIN } from '../redux/userSlice'
import LoadingSpinner from '../components/LoadingSpinner'

const Register = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState(false)
  const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault()
    const userRegisterInfo = {name, email, password }

    if(name === "" || email ==="" || password === "" || confirmPassword === ""){
      setError("Please Validate all fields")
      setTimeout(() => {
        setError(false)
      },3500)
    }else if(!emailRegEx.test(email)){
      setError("Please Enter a valid email address")
      setTimeout(() => {
        setError(false)
      },3500)
    }else if(password !== confirmPassword){
      setError("Password fields do not match")
      setTimeout(() => {
        setError(false)
      },3500)
    }else if(password.length < 6){
      setError("Password length must be at least 6 characters")
      setTimeout(() => {
        setError(false)
      },3500)
    }else{
      setIsLoading(true);
      const response = await fetch('https://bookshareserver.herokuapp.com/api/v1/mylibrary/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userRegisterInfo),
      headers: {
        'Content-Type':'application/json',
      }
    })
    if(response) setIsLoading(false)
      const data = await response.json()
      console.log(data)
      console.log(response)
      if(!response.ok){
          setError(data.msg)

          setTimeout(() => {
            setError(false)
          },3500)
          
      }else{
        navigate('/')
        dispatch(LOGIN(data))
        localStorage.setItem('signedInuser',JSON.stringify(data))
      }
    }
  }

  return (
    <>
    {isLoading ? <LoadingSpinner /> : 
        <form className="signup-fields" onSubmit={handleRegister}>
            <h1 style={{textAlign:"left"}}>Sign up</h1>
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
      }
    </>
    //   </div>
    // </div>
  )
}

export default Register