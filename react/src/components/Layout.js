import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import '../styles/index.css';
import '../styles/style.css';

export default function Layout() {
  return (
    <div >
        <Navbar/>
        <main className='container'>
            <Outlet/>
        </main>
    </div>
  )
}
