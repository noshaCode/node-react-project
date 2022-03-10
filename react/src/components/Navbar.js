import { Link } from 'react-router-dom'
import React, { useContext } from 'react'
import { UserContext } from '../App'

export default function Navbar() {
  const { user } = useContext(UserContext)

  return (
    <nav>
      <ul>
        {/* <li> Hello {user && user.name}</li> */}
        <li><i className="fas fa-home"></i><Link to="/">Home</Link></li>
        {user ? (<li><i className="fas fa-sign-in-alt"></i><Link to="/logout">Logout</Link></li>) 
        :(
          <>
            <li><i className="fas fa-sign-in-alt"></i><Link to="/signup">Signup</Link></li>
            <li><i className="fas fa-sign-in-alt" ></i><Link to="/login">Login</Link></li>
          </>
          )}

        <li><i className="fas fa-plus-circle"></i><Link to="/questions/new">Add Question</Link></li>
      </ul>
    </nav>
  )
}
