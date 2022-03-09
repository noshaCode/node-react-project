import { Link } from 'react-router-dom'
import React, { useContext } from 'react'
import { UserContext } from '../App'

export default function Navbar() {
    const {user} = useContext(UserContext)

  return (
    <nav>
      <ul>
        <li><i className="fas fa-home"></i><Link to="/">Home</Link></li>
        <li><i className="fas fa-plus-circle"></i><Link to="/questions/new">Add Question</Link></li>
        <li><i className="fas fa-sign-in-alt"></i><Link to="/signup">Signup</Link></li>
      </ul> 
    </nav> 
  )
}
