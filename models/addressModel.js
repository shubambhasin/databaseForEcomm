const mongoose = require('mongoose')

const { Schema, model } = mongoose

const AddressSchema = new Schema({

  userId: {
    type: Schema.Types.ObjectId,
    ref: "signup"
  },
  addresses: [
    {
      pincode: {
        type: Number,
        required: [true, "Please enter a pincode"]
      },
      district: {
        type: String,
        required: [true, "Enter the district name"]
      },
      state: {
        type: String,
        required: [true, "Select state name"]
      },
      address: {
        type: String,
        required: [true, "Please enter your address"]
      }
    }
  ]
}, {
  timestamps: true
})

const Address = new model('address', AddressSchema)

module.exports = { Address }