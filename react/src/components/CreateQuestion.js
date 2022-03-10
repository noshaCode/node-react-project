import React, {useContext, useEffect} from 'react'
import { useForm } from "react-hook-form"
import axios from "../axios"
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../App'


export default function CreateQuestion() {
  const navigate = useNavigate()
  const {user} = useContext(UserContext)
  const { handleSubmit, register, formState: { errors } } = useForm();

  
  const onSubmit = async (values) =>{ 
    
    //call post
    try{
      
    const body = {
      question: values.question,
      description: values.description,
      userId: user.id
    }
     const response = await axios.post("/new/question",  body)
     console.log('response', response.data)
      navigate('/')
    } catch(e){
      console.log(e)
    }
    
  };

  return (
    <div>

      <h3>Add Question </h3>
      <div>
        {!user && <div className='username'>Please Login first</div>}
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>

        <div>
          <input type="text" placeholder="Question"  className="form-control"{...register("question", { required: "Required" })} />
        </div>

        <div>
          {errors.question && errors.question.message}
        </div>

        <div>
          <textarea rows="10" cols="20" placeholder="Description" className="form-control" {...register("description", { required: "Required" })}></textarea>
        </div >

        <div>
          {errors.description && errors.description.message}
        </div>


        <div>
          <button type="submit" className="btn btn-primary  class1 " disabled={!user}>Submit</button>
          
        </div>
        

      </form>

    </div>
  )
}


{/* // const getQuestions = async() => {
//   try {
//       const listOfQuestions = await axios.get('http://localhost:4000/');
//       setQuestions(listOfQuestions.data)
//   } catch (e) {
//       console.error('Error', e)
//   }
// } */}