import React, {useEffect, useState, useContext} from 'react'
import { Link } from 'react-router-dom';
import { UserContext } from '../App';
import axios from '../axios';

function QuestionsList(props) {
    const { user } = useContext(UserContext)
    const [questions, setQuestions] = useState([]);

    useEffect(()=> {
        
        getQuestions()

    }, [])

    const getQuestions = async() => {
        try {
            const listOfQuestions = await axios.get('/');
            setQuestions(listOfQuestions.data)
        } catch (e) {
            console.error('Error', e)
        }
    }

  return (
    <div className='row'>
         <h1> {user && <>Welcome <span className='username'>{user.name}</span> to </>} Q&A Community</h1>
        {questions && questions.map((item)=> {
            return (

                <div key={item._id} className="col-sm-6 all-card">
                <div className="card">
                    <div className="card-body">
                        <h3 className="card-title"><Link to={`/questions/${item._id}`}>
                                { item.question }
                            </Link></h3>
                        <p className="card-text">
                            { item.description }
                        </p>
                        <div className=" create-date">
                        <p>Created By: { item?.user?.name }
                            <br/>
                            { new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'short' }).format(new Date(item.updatedAt)) }
                        </p>
                        </div>
                    </div>
                </div>
                </div>


            )
        })}
    </div>
  )
}


export default QuestionsList
