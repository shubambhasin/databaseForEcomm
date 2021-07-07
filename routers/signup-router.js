const express = require('express')
const router = express.Router()
const { Signup, signupSchema } = require('../models/signupModel.js')
const jwt = require("jsonwebtoken")

const mySecret = process.env['tokenSecret']
const secret = mySecret

const handleError = (error, res) => {  
  console.log(error.message)
  const errors = {
    email: "",
    password: ""
  }
  if(error.message === "Email not registered")
  {
    errors.email = "Email not registered"
  }
  if(error.message === "Password incorrect")
  {
    errors.password = "Password incorrect"
  }
  if(error.code === 11000)
  {
    errors.email = "Email already registered, please login instead"
    res.json({error: errors})
    return
  }
  if(error.message.includes("user validation failed"))
  {
    Object.values(error.errors).forEach(({properties}) => {
      errors[properties.path]= properties.message;
    })
    return res.json({error: errors})
  }
res.json({error: errors})
}
const maxAge = 24*60*60
const createToken = ( id ) => {
  return jwt.sign( {id}, secret, {
    expiresIn: maxAge*10
  })
}






router.route('/')
.get((req, res) => {

  res.send("SignUp")
})
.post( async (req, res ) => {
    try
    {
      const {name, email, password} = req.body

      const newUser = new Signup({ name: name, email: email, password: password})
      const user = await newUser.save()
      const token = createToken(user._id)
      res.json({success: true, name: user.name, token})


    }
      catch(error){
      handleError(error, res)
    }


})

module.exports = router;