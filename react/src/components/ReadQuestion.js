import React, { useContext, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { UserContext } from '../App'

export default function ReadQuestion() {
    const navigate = useNavigate()
    const {user} = useContext(UserContext)


    useEffect(()=>{
        if(!user){
            navigate('/login')
        }
    },[])

  return (
    <div>ReadQuestion</div>

  )
}
