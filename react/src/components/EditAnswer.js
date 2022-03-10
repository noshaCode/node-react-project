import React, { useContext, useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { UserContext } from '../App'
import axios from '../axios'
import { useForm } from "react-hook-form"



export default function ReadQuestion() {
  const navigate = useNavigate()
  const params = useParams() //get the value that change
  const { user } = useContext(UserContext)
  const [response, setResponse] = useState(null);


  const { handleSubmit, register, formState: { errors } } = useForm();


  useEffect(()=>{
    GetAnswer()
     
  },[])


  const GetAnswer = async() => {
    try {
        const readAnswer = await axios.get(`/edit/answer/${params.id}`);
        console.log("read",readAnswer)
         setResponse(readAnswer.data)

    } catch (e) {
        console.error('Error', e)
    }
}

  const onSubmit = async (values) => {
    //call post
    try {
      console.log(values)
      const responseAnswer = await axios.post(`/edit/answer/${params.id}`, values)
      console.log('response', responseAnswer.data)
      navigate(`/questions/${responseAnswer.data.question._id}`)
    } catch (e) {
      console.log(e)
    }
  };




  return (
  
  <div>
    {console.log(response)}
    {response && 
      <>
     <p>{response.question.question} </p>
        <p>{response.question.description} </p>

      <h1>EditYour Answer</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <textarea rows="10" cols="20" placeholder=" Edit An Answer" {...register("answer", { required: "Required" })} required >{response.answerToEdit.answer}</textarea>
        </div >

        <div>
          <button type="submit">Update</button>
        </div>
      </form>
    
    </>
    }
    </div>
  )
}
