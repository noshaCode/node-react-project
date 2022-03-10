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
    <h2>Question :</h2>
    {console.log(response)}
    {response && 
      <>
     
     <div className="card q-card">
          <h3  className="card-title">{response.question.question} </h3>
          <p className="card-text">{response.question.description} </p>
          </div>
      <h2>Edit Your Answer:</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <textarea class="form-control" rows="10" cols="20" placeholder=" Edit An Answer" {...register("answer", { required: "Required" })} required >{response.answerToEdit.answer}</textarea>
        </div >

        <div>
          <button  className="btn btn-primary  class1 " type="submit">Update</button>
        </div>
      </form>
    
    </>
    }
    </div>
  )
}
