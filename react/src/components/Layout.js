import React, {useState} from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import '../styles/index.css';
import '../styles/style.css';

export default function Layout() {

  const [navClass, setNavClass] = useState("")


  const handleOpen = () => {
    setNavClass("show-nav")
  }

  const handleClose = () => {
    setNavClass("")
  }

  return (
    <>
    <div className={`custom-container ${navClass}`}>
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
    <Navbar/>
    </>
  )
}
