import React, {useContext} from 'react'
import { useForm } from "react-hook-form"
import axios from "../axios"
import { useNavigate } from 'react-router-dom'






export default function CreateQuestion() {
  const navigate = useNavigate()
  // const {user} = useContext(UserContext)
  const { handleSubmit, register, formState: { errors } } = useForm();
  
  
  const onSubmit = async (values) =>{ 
    
    //call post
    try{
      
      const response = await axios.post("/new/question",  values)
      console.log('response', response.data)
      navigate('/')
    } catch(e){
      console.log(e)
    }
    
  };

  return (
    <div>

      <p>Add Question </p>

      <form onSubmit={handleSubmit(onSubmit)}>

        <div>
          <input type="text" placeholder="Question"  class="form-control"{...register("question", { required: "Required" })} />
        </div>

        <div>
          {errors.question && errors.question.message}
        </div>

        <div>
          <textarea rows="10" cols="20" placeholder="Description" class="form-control" {...register("description", { required: "Required" })}></textarea>
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


{/* // const getQuestions = async() => {
//   try {
//       const listOfQuestions = await axios.get('http://localhost:4000/');
//       setQuestions(listOfQuestions.data)
//   } catch (e) {
//       console.error('Error', e)
//   }
// } */}

