const express = require("express");

const authRouter = express.Router();

const {signupFormSubmit,logInFunc,logOutFunc } = require('./controllers/authController')


authRouter.post('/signup', signupFormSubmit)


authRouter.post('/login', logInFunc);
authRouter.get('/logout',logOutFunc);


// authRouter.get('/all-users',allUsers) // only for test


module.exports = authRouter;
