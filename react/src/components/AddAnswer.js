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



    // useEffect(() => {
    //     getQuestion()

    // }, [])


    // const getQuestion = async () => {
    //     try {
    //         const readQuestion = await axios.get(`/question/${params.id}`);
    //         console.log("read", readQuestion.data)
    //         //setResponse(readQuestion.data)
    //     } catch (e) {
    //         console.error('Error', e)
    //     }
    // }
   

    const { handleSubmit, register, formState: { errors } } = useForm();
    
    
    const onSubmit = async (values) =>{ 
      
      //call post
      try{
        console.log(values)
        const response = await axios.post(`/new/answer/${params.id}`,  values)
        console.log('response', response.data)
        navigate(`/questions/${params.id}`)
      } catch(e){
        console.log(e)
      }
      
    };



    return (
        <div>
            <p>{params.id}</p>

            <h1>Add Your Answer</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <textarea rows="10" cols="20" placeholder=" Write An Answer" {...register("answer", { required: "Required" })} required ></textarea>
                </div >

                <div>
                    <button type="submit">Submit</button>
                </div>


            </form>
        </div>


    )
}
