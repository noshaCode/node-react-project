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


  useEffect(() => {
    getQuestion()

  }, [])


  const getQuestion = async () => {
    try {
      const readQuestion = await axios.get(`/question/${params.id}`);
      console.log("read", readQuestion.data.answer)
      setResponse(readQuestion.data)

    } catch (e) {
      console.error('Error', e)
    }
  }

  const onSubmit = async (values) => {
    //call post
    try {
      console.log(values)
      const responseAnswer = await axios.post(`/new/answer/${params.id}`, values)
      console.log('response', responseAnswer.data)
      navigate(`/questions/${params.id}`)
    } catch (e) {
      console.log(e)
    }
  };




  return (

    <div>
      
      {console.log(params)}
      {response &&
        <>
          <div className="card q-card">
          <h3  className="card-title">{response.question.question} </h3>
          <p className="card-text">{response.question.description} </p>
          </div>
          <h2>Add Your Answer :</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <textarea rows="10" cols="20" class="form-control" placeholder=" Write An Answer" {...register("answer", { required: "Required" })} required ></textarea>
            </div >

            <div>
              <button type="submit" className="btn btn-primary  class1 " >Add Answer</button>
            </div>
          </form>

        </>
      }
    </div >
  )
}
