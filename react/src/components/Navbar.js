import { Link } from 'react-router-dom'
import React, { useContext } from 'react'
import { DarkModeContext, UserContext } from '../App'

export default function Navbar(props) {
  const { user } = useContext(UserContext)
  const { darkMode, setDarkMode } = useContext(DarkModeContext)

  const handleClick = () => {
    props.setNavClass("")
  }

  const handleIconClick = () => {
    setDarkMode(!darkMode)
  }

  return (
    
    <nav>
      
      <ul>
        {/* <li> Hello {user && user.name}</li> */}
        <li><i className={`fas ${darkMode ? 'fa-moon' : 'fa-sun'}`} onClick={handleIconClick}></i></li>
        <li><i className="fas fa-home"></i><Link to="/" onClick={handleClick}>Home</Link></li>
        {user ? (<li><i className="fas fa-sign-in-alt"></i><Link to="/logout" onClick={handleClick}>Logout</Link></li>) 
        :(
          <>
            <li><i className="fas fa-sign-in-alt"></i><Link to="/signup" onClick={handleClick}>Signup</Link></li>
            <li><i className="fas fa-sign-in-alt" ></i><Link to="/login" onClick={handleClick}>Login</Link></li>
          </>
          )}

        <li><i className="fas fa-plus-circle"></i><Link to="/questions/new" onClick={handleClick}>Add Question</Link></li>
      </ul>
    </nav>
  )
}
