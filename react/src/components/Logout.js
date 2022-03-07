import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Logout() {

    const navigate = useNavigate()

   useEffect(()=> {
        // tell backend to logout

        navigate('/')

   },[]) 


  return (
    <div>Logout</div>
  )
}
