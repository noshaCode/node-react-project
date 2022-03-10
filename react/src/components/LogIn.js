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
    console.log("data", data)
    axios.post("/login", data)
          .then( response => {
            console.log("are we here")
            let token = response.data.token;
            localStorage.setItem('user', token)
            setUser(response.data.result)
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
        <h3>Login</h3>
        <form onSubmit={handleSubmit}>
          <input name='email' type="text" placeholder='email' className="form-control" onChange={handleChange} />
          <input name='password' type="password" placeholder='password'className="form-control" onChange={handleChange} />
          <input type="submit" value='Log in' className="btn btn-primary  class1 " onSubmit={handleSubmit} />
        </form>
        { loginResponse.result ? loginResponse.result : null }
      </div>
    )
  
}
