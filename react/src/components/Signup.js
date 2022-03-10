import React from 'react'
import { useForm } from "react-hook-form"
import axios from "../axios"
import { useNavigate } from 'react-router-dom'





export default function SignUp () {
  const navigate = useNavigate()

  const { handleSubmit, register, formState: { errors } } = useForm();
  
  
  const onSubmit = async (values) =>{ 
    
    //call post
    try{
      
      const response = await axios.post("/signup",  values)
      console.log('response', response.data)
      navigate('/')
    } catch(e){
      console.log(e)

    }
    
  }; 

  return (
    <div>

      <h1>Register Page</h1>

      <form onSubmit={handleSubmit(onSubmit)}>

        <div>
          <input type="text" placeholder="Enter Name" className="form-control" {...register("name", { required: "Required" })} required></input>
        </div>

        <div>
          <input type="email" placeholder="Enter Email" className="form-control" {...register("email", { required: "Required" })} required ></input>
        </div >

        <div>
          <input type="password"  placeholder="Enter Password" className="form-control" {...register("password", { required: "Required" })} required></input>
        </div >

        <div>
          <button type="submit" className="btn btn-primary  class1 ">Submit</button>
        </div>

      </form>

    </div>
  )}

