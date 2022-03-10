import React, { useState,useEffect,useContext} from 'react';
import axios from '../axios';
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../App'


export default function LogIn() {
  const navigate = useNavigate()
  const {setUser} = useContext(UserContext)

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
    axios.post("/login", data)
          .then( response => {
            let token = response.data.token;
            let user = response.data.result;
            localStorage.setItem('token', token)
            localStorage.setItem('user', JSON.stringify(user))
            setUser(response.data.result)
            navigate('/')
          })
          .catch( err => {
            console.log("login error", err)
            setLoginResponse((prevState) =>({
              ...prevState,
              result: err.message
            }))
          })
  }
 
    return (
      <div>
        
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input name='email' type="text" placeholder='email' className="form-control" onChange={handleChange} />
          <input name='password' type="password" placeholder='password'className="form-control" onChange={handleChange} />
          <input type="submit" value='Log in' className="btn btn-primary  class1 " onSubmit={handleSubmit} />
        </form>
        <img className='img-login' src='./images/login.jpg'></img>
        { loginResponse.result ? loginResponse.result : null }
      </div>
    )
  
}
