const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const { Signup } = require('../models/signupModel.js')

router.route('/')
.post(async (req, res) => {
try{
    const userCheck = req.body
    // match with db
    const email = await Signup.findOne({ email: userCheck.email })
    const pass = await Signup.findOne({ password: userCheck.password })
    
    if (email) {
      if (pass) {
          res.status(200).json({ success: true, "user": {...req.body, userId: email._id } })
      }
      else {
        res.status(401).json({ success: false, error: "password incorrect" })
      }
    }

    res.status(404).send({ success: false, error: "user do not exist"})

} catch(err){
  res.send({success: false, err: err})
}

  })

module.exports = router;
