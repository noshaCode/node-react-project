const res = require("express/lib/response");
const Question = require("../models/question")
const Answer = require("../models/answer")
const {handleAnswersError}=require("./errorHandling")


const AnswerForm = async (req, res) => {
      // console.log("-------------------------44444444----------");          
       //console.log(req.params.id);
       
        const body = req.body
        const user = res.locals.user
        const id = req.params.id; 

        const question=await Question.findById(id).populate('user'); 

        try {
            await Answer.create({
                answer:body.answer,
               // user: user.id ,
                 question: question       
            })
          
           //res.redirect(`/question/${id}`)
           res.status(200).send('created')

        } catch (error) {
            console.error(error)
           
            res.redirect(`/question/${id}`)
        }        
       
}


const UpdateAnswer = async (req, res) => {
  //console.log(req[-1])
    const body = req.body
    const user = res.locals.user
    const id = req.params.id; 

    const currentUserId = user ? user.id : "";

    //console.log(req.params.id);
        
    try {
        const answerToEdit = await Answer.findById(id)
        console.log("-----------------------------------------------"); 
         const questionId = answerToEdit.question.toString();
        const question=await Question.findById(questionId).populate('user'); 
        const answer = await Answer.find({ question }).populate('user').sort({createdAt:-1});
        
  //console.log(question , );
       // res.render("questions/readQuestion", {result:question, answerToEdit,answer,currentUserId ,pageTitle:question.question})
       res.json({question,answerToEdit})
    } catch (err) {
      console.log(err)  
    //res.redirect(`/question/${questionId}`)

    }

}


const AnswerWithEdit = (req,res) => {
    const id = req.params.id
     const body = req.body
      
 Answer.findByIdAndUpdate(id, body)
 .then((result) => {
        // console.log("-------------------------------------------")
       const questionId = result.question.toString()
       
   res.redirect(`/question/${questionId}`);
   
    //console.log("-------------------------------------------")
 })
 .catch((err) => {
console.log(err);
res.redirect("/");
 })

 }
 

 
const DeleteAnswer = (req,res)=> {
    const id = req.params.id
    Answer.findByIdAndDelete(id)
    .then((result)=>{
        const questionId = result.question.toString()
    // res.redirect(`/question/${questionId}`);
     res.status(200).send();
    })
    .catch((err)=>{
       // res.redirect(`/answer/${id}`);
        res.status(400).send();
    })
}


module.exports = {
    UpdateAnswer,
    AnswerWithEdit,
    DeleteAnswer,
    AnswerForm,
}