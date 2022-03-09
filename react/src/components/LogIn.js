import React, { useState,useEffect } from 'react';
import axios from '../axios';
import { useNavigate } from 'react-router-dom'

export default function LogIn() {
  const navigate = useNavigate()

const [loginResponse,setLoginResponse] = useState({
  email: '',
  password: '',
  result: ''
})

  const handleChange = (e) => {
    setLoginResponse((prevState) =>({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    let data = {
      email: loginResponse.email,
      password: loginResponse.password
    }
    console.log("data", data)
    axios.post("/login", data)
          .then( response => {
            console.log("are we here")
            let token = response.data.token;
            localStorage.setItem('user', token)
            navigate('/')
          })
          .catch( err => {
            console.log("are we here2", err)

            setLoginResponse((prevState) =>({
              ...prevState,
              result: err
            }))
          })
  }
 
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <input name='email' type="text" placeholder='email' onChange={handleChange} />
          <input name='password' type="password" placeholder='password' onChange={handleChange} />
          <input type="submit" value='Log in'  onSubmit={handleSubmit} />
        </form>
        { loginResponse.result ? loginResponse.result : null }
      </div>
    )
  
}
