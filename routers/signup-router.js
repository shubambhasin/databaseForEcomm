const express = require('express')
const router = express.Router()
const { Signup, signupSchema } = require('../models/signupModel.js')

router.route('/')
.get((req, res) => {

  res.send("SignUp")
})
.post( async (req, res ) => {
    try
    {
      const {name, email, password} = req.body

      const newUser = new Signup({ name: name, email: email, password: password})
      const savedData = await newUser.save()
      res.json({success: true, data: savedData})
    }
    catch(err){
      res.json({"error": err})
      console.log(err)
    }


})

module.exports = router;