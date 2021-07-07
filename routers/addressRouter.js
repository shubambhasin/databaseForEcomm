const express = require('express')
const router = express.Router()
const { decodeUserId } = require('../utils/decodeUserId.js')
const { Address} = require('../models/addressModel')

const saveAddress = async ( userId, data, token, res) => {

    const user = await Address.find({ userId })
    try{
      if(user.length === 0)
    {
      console.log("No entries found")

      const newAddress = new Address({
        userId: userId,
        addresses: [
          {
            pincode: data.pincode,
            district: data.district,
            state: data.state,
            address: data.address
          }
        ]
      })
      await newAddress.save()
      return res.json({success: true, message: "address saved succesfully"})
    }
    else{

      const user = await Address.findOne({ userId });
      user.overwrite({ 
        userId: userId,
        addresses: [
          {
            pincode: data.pincode,
            district: data.district,
            state: data.state,
            address: data.address
          }
        ]
      });
      await user.save();
      console.log("Address updated")
      return res.json({success: true, message:"Address details updated successfully", user})
    }
    } catch(error){
      res.json({success: false, error})
    }

}

router.route('/')
.get( async( req, res) => {
    try{
      const user = await Address.find()
      res.json({success: true, user})
    } catch(error){
      res.json({succes: false, error})
    }
})
.post( async( req, res ) => {
    const authToken = req.headers.authorization
    const data = req.body
    console.log(data)
    try{
      const userId = decodeUserId(authToken)
      console.log(userId)
      saveAddress(userId, data, authToken, res)
    } catch(error){
      res.json({success: false, error})
    }
})

module.exports = router