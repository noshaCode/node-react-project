import React, { useContext, useEffect ,useState} from 'react'
import { Navigate, useNavigate, useParams  } from 'react-router-dom'
import { UserContext } from '../App'
import axios from '../axios'
import { useForm } from "react-hook-form"



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
          console.log("read",readQuestion.data.answer)
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

  const handleEditAnswer = (id,e) =>{
    e.preventDefault();
    navigate(
      `/questions/editanswer/${id}`,{
      state: {
        question: response.question.question, 
        description: response.question.description
      }
    }
  )
  }

  
  const handleDeleteAnswer = (id,e) =>{
    e.preventDefault();
   // console.log(response.answer[0]._id, id)
    //axios.get(`/delete/answer/${response.answer[0]._id}`)
    axios.get(`/delete/answer/${id}`)
    .then(()=>{
      //navigate(`/questions/${params.id}`)
      window.location.reload(true);
    })
    .catch((e)=>{
      console.log(e)
    })
  }

    const handleAddAnswer = () => {
    navigate(
        `/questions/addanswer/${params.id}`,{
        state: {
          question: response.question.question, 
          description: response.question.description
        }
      }
    )
  }



  return (
    <div>
    {response && 
      <>

      <div className="card q-card">
        <h3  className="card-title">{response.question.question} </h3>
        <p className="card-text">{response.question.description} </p>

     </div>

       <br/>
      <div className="form-control">
        
        <p>{response.question.question} </p>
        <p>{response.question.description} </p>

        </div>
        <br/>


        <button onClick={handleEdit} className="btn btn-primary  class1 ">Edit Question</button>

        <button onClick={handleDelete} className="btn btn-primary  class1 ">Delete Question</button>
      




        
       <p>{response.answer.answer} </p>
      
    

     <button   onClick={handleAddAnswer} className="btn btn-primary  class1" >Add Answer </button>


     <button  onClick={handleAddAnswer}   className="btn btn-primary  class2"> Add Answer </button>
 
     <div>
        {response.answer && response.answer.map((item)=> {
            return (

                <div key={item._id} className="col-sm-6 all-card">
                <div className="card">
                    <div className="card-body">
                        
                        <p className="card-text">
                            { item.answer }
                        </p>
                        <div className=" create-date">
                        <p>Created at:{ item?.user?.name }
                            { new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'short' }).format(new Date(item.updatedAt)) }
                        </p>
                        <button onClick={(e) => handleDeleteAnswer(item._id,e)} className="btn btn-primary  class1 ">Delete Answer</button>
                        <button onClick={(e) => handleEditAnswer(item._id,e)} className="btn btn-primary  class1 ">Edit Answer</button>
                        </div>
                    </div>
                </div>
                </div>
            )
        })}
    </div>
     </>
     }
  </div>

  )
}
