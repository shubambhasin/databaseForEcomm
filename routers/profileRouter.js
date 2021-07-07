const express = require('express')
const router = express.Router()
const { Address } = require('../models/addressModel')
const { Signup } = require('../models/signupModel')
const { decodeUserId } = require('../utils/decodeUserId.js')



router.route('/')
.get( async( req, res ) => {

  const token = req.headers.authorization
  const userId = decodeUserId( token )

  try{

    console.log("inside try 17 line")

   const userInfo = await Signup.findById({_id: userId})
    const userAddress = await Address.find({userId})
    
    console.log("inside try 22 line")
    res.json({ success: true, userInfo, userAddress})

  }catch(error){
    res.json({ error: error, message: "Cant find user" })
  }

})


module.exports = router