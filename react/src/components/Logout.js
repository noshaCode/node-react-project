import React, { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../App'

export default function Logout() {

    const navigate = useNavigate()
    const {setUser} = useContext(UserContext)

   useEffect(()=> {
        // tell backend to logout
      logoutClear()
        navigate('/')

   },[]) 
  //  let user= JSON.parse(localStorage.getItem("user-info"))
   function logoutClear(){
     setUser(null);
    localStorage.clear();

   }
  

  return (
    <div>Logout</div>
  )
}
