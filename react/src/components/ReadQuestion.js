import React, { useContext, useEffect ,useState} from 'react'
import { Navigate, useNavigate, useParams  } from 'react-router-dom'
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

  const handleEdit = () => {
    navigate(
        `/questions/edit/${params.id}`,{
        state: {
          question: response.question.question, 
          description: response.question.description
        }
      }
    )
  }
  const handleDelete =()=>{
    axios.get(`/delete/question/${params.id}`)
    .then(()=>{
      navigate(`/`)
    })
    .catch((e)=>{
      console.log(e)
    })
  

  }


  return (
    <div>
    {response && 
      <>
        <p>{response.question.question} </p>
        <p>{response.question.description} </p>
        <button onClick={handleEdit} className="btn btn-primary  class1 ">Edit Question</button>
        <button onClick={handleDelete} className="btn btn-primary  class1 ">Delete Question</button>
      </>
    }

  </div>

 
    

  )
}
