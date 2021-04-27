const mongoose = require('mongoose')
const { Schema } = mongoose;

const signupSchema = new Schema( {
  name: {
    type: String,
    required: true,
  },
   email: {
    type: String,
    required: true,
    dropDups: true,
    unique: true 
  },
  password: {
      type: String,
      minLength: 6,
      maxLength: 12,
      required: true
  }

})

const Signup = mongoose.model('signup', signupSchema)

module.exports = { signupSchema, Signup }