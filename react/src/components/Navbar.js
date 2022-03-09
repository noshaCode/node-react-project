import { Link } from 'react-router-dom'
import React, { useContext } from 'react'
import { UserContext } from '../App'

export default function Navbar() {
    const {user} = useContext(UserContext)

  return (
    <> 
        <div>Hello {user && user.name}</div>
        <div><Link to="/signup">Signup</Link></div>
        <div><Link to="/login">Log In</Link></div>


        <div><Link to="/">Home</Link></div>
        <div><Link to="/questions/new">Add Question</Link></div>
    </> 
  )
}
