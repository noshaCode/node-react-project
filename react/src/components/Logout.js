import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Logout() {

    const navigate = useNavigate()

   useEffect(()=> {
        // tell backend to logout

        navigate('/')

   },[]) 
  //  let user= JSON.parse(localStorage.getItem("user-info"))
  //  function Logout(){
    localStorage.clear();

  //  }
  

  return (
    <div>Logout</div>
  )
}
