import React, { useState, useEffect } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import ErrorMsg from '../components/ErrorMsg'
import { useSelector, useDispatch } from 'react-redux'
import { LOGIN } from '../redux/userSlice'

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
  const navigate = useNavigate()

  const dispatch = useDispatch()

  // const user = useSelector(state => state.user)
  // console.log(user)

  const handleLogin = async (e) => {
    e.preventDefault()
    const userLoginInfo = {email, password}
    const response = await fetch('/api/v1/mylibrary/auth/signin', {
    method: 'POST',
    body: JSON.stringify(userLoginInfo),
    headers: {
      'Content-Type':'application/json',
     }
  })
    const data = await response.json()
    if(!response.ok){
        setError(data.Err)

        setTimeout(() => {
          setError(false)
        },5000)

    }else{
      navigate('/')
      localStorage.setItem('signedInuser',JSON.stringify(data))
      dispatch(LOGIN(data))
      console.log(data)
    }
  }

  return (
    <form className="login-fields" onSubmit={handleLogin}>
        <h1>Sign in</h1>
          {error && <ErrorMsg msg={error}/>}
        <div className='inputParent'>
          <input type="text" name="email" placeholder="E-mail" onChange={e => setEmail(e.target.value)} value={email} />
          <input type="password" name="password" placeholder="Password" onChange={e => setPassword(e.target.value)} value={password} />
                    
          <input type="submit" name="signup_submit" value="Sign in" />
          <p>Don't have an account? <Link to="/registeruser">Sign up</Link></p>
        </div>
    </form>
        
  )
}

export default Login