const User = require("../models/user")
const jwt = require("jsonwebtoken")
const { handleSignupError } = require('./errorHandling.js')
const bcrypt = require('bcrypt')

const maxAge = 8 * 24 * 60 * 60; // 8 days in seconds
const createJwtToken = (id) => jwt.sign({ id }, "my password", { expiresIn: maxAge })



// allUser function only for test
// const allUsers = async (req, res) => {
//     await User.find()
//         .then((result) => {
//             res.status(200).send(result);
//         })
//         .catch((err) => {
//             res.status(400).send("unable to find users");
//         });
// };


// GET Request to show signup form
const showSignupForm = (req, res) => {

    res.redirect('/')

}

const signupFormSubmit = async (req, res) => {
    await User.findOne({ email: req.body.email })
        .then(async result => {
            if (result) {
                return res.status(400).send("Email already exists")
            }
           // console.log(req)
            let user = {
                ...req.body,
                password: await bcrypt.hash(req.body.password, 12)
            }
            let newUser = new User(user);

            newUser.save()
                .then(result => {
                    res.status(200).send('Saved in database')
                })
                .catch(err => {
                   // console.log(err)
                    res.status(401).send(err);
                })
        })
        .catch(err => {
            console.log(err)
            res.status(402).send(err)
        })
};
///////////////////////////////////////
//start LogIn Fun
///////////////////////////////////////
const logInFunc = async (req, res) => {
    await User.findOne({ email: req.body.email })
        .then(async result => {
           // console.log(req)
            if (!result) {
                return res.status(400).send("User is not exist please sign up first")
            }
            if (!bcrypt.compareSync(req.body.password, result.password)) {
                return res.status(400).send("Password is not correct")
            }
            const token = await jwt.sign({ user: result }, 'jwt-react', { expiresIn: '1d' });
            res.status(200).send({ result, token })
           // console.log(result)
        })
        .catch(err => {
            //console.log(err)
            res.status(400).send(err)
        })
};

const logOutFunc = (req, res) => {
    // res.cookie('jwtToken', '', {maxAge: 1});
  //  res.clearCookie('jwtToken');
   // res.redirect('/');
}

module.exports = {
    logInFunc,
    logOutFunc,
    signupFormSubmit,
    allUsers
}
