import React, {useEffect, useState, useContext} from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import '../styles/index.css';
import '../styles/style.css';
import { DarkModeContext } from '../App';

export default function Layout() {

  const [navClass, setNavClass] = useState("")
  const { darkMode } = useContext(DarkModeContext)

  const handleOpen = () => {
    setNavClass("show-nav")
  }

  const handleClose = () => {
    setNavClass("")
  }

  return (
    <>
    
    <div className={`custom-container ${navClass} ${darkMode? 'dark' : ''}`}>
        <div className="circle-container">
        <div className="circle">
          <button id="close" onClick={handleClose}>
            <i className="fas fa-times"></i>
          </button>
          <button id="open" onClick={handleOpen}>
            <i className="fas fa-bars"></i>
          </button>
        </div>
      </div>
        <main className='container'>
            <Outlet/>
        </main>
    </div>
    <Navbar setNavClass={setNavClass}/>
    </>
  )
}
