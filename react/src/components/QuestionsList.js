import React, {useEffect, useState} from 'react'
import axios from 'axios'

function QuestionsList(props) {

    const [questions, setQuestions] = useState([]);

    useEffect(()=> {
        
        getQuestions()

    }, [])

    const getQuestions = async() => {
        try {
            const listOfQuestions = await axios.get('http://localhost:4000/');
            setQuestions(listOfQuestions.data)
        } catch (e) {
            console.error('Error', e)
        }
    }

  return (
    <div>
        {questions && questions.map((question)=> {
            return (
                <div key={question._id}>
                    <h3>{question.question}</h3>
                    <p>{question.description}</p>
                    <p>Asked by: {question.user.name}</p>
                </div>
            )
        })}
    </div>
  )
}


export default QuestionsList
