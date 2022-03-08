import React, { useContext, useEffect ,useState} from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { UserContext } from '../App'
import axios from '../axios'



export default function ReadQuestion() {
    const navigate = useNavigate()
    const params = useParams() //get the value that change
    const {user} = useContext(UserContext)
    const [response, setResponse] = useState(null);


    useEffect(()=>{
      getQuestion()
       
    },[])


    const getQuestion = async() => {
      try {
          const readQuestion = await axios.get(`/question/${params.id}`);
          console.log("read",readQuestion.data)
          setResponse(readQuestion.data)
      } catch (e) {
          console.error('Error', e)
      }
  }

  return (
    <div>
    {response && 
    <>
    <p>{response.question.question} </p>
    <p>{response.question.description} </p>
    </>
  }
  </div>
    

  )
}
