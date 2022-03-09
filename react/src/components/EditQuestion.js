import React from 'react'
import axios from "../axios"
import { useForm } from "react-hook-form"
import { Navigate, useNavigate, useParams, useLocation } from 'react-router-dom'



export default function EditQuestion(){
    const navigate = useNavigate()
    const {state} = useLocation();
    
    const { handleSubmit, register, formState: { errors } } = useForm({
        defaultValues: state
    });
    const params = useParams() //get the value that change



    console.log("WHAT IS STYATE", state)

    const onSubmit = async (values) =>{ 
  
  //call post
  try{
    
    const response = await axios.post(`/edit/question/${params.id}`, values)
    console.log('response', response.data)
    navigate('/')
  } catch(e){
    console.log(e)
  }
  
};

return (
  <div>

    <p>Edit Question</p>

    <form onSubmit={handleSubmit(onSubmit)}>

      <div>
        <input type="text" placeholder="Question" {...register("question", { required: "Required" })} />
      </div>

      <div>
        {errors.question && errors.question.message}
      </div>

      <div>
        <textarea rows="10" cols="20" placeholder="Description" {...register("description", { required: "Required" })}></textarea>
      </div >

      <div>
        {errors.description && errors.description.message}
      </div>

      <div>
        <button type="submit" className="btn btn-primary  class1 ">Submit</button>
      </div>

    </form>

  </div>
)
}



    
