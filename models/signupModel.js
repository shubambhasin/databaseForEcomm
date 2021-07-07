const mongoose = require('mongoose')
const { Schema } = mongoose;
const bcrypt = require('bcrypt')
const { isEmail } = require('validator')

const SignupSchema = new Schema( {
  name: {
    type: String,
    required: [true,"Please enter a name"]
  },
  email: {
    type: String,
    required: [true, "Please enter email"],
    unique: true,
    validate: [isEmail, "Please enter an valid Email"]
  },
  password: {
      type: String,
       type: String,
    minlength: [6,"password should be atleast of 6 characters"]
  }

}, { timestamps: true})

SignupSchema.pre("save", async function(next){
const salt = await bcrypt.genSalt()
this.password = await bcrypt.hash(this.password, salt)
next()
})


SignupSchema.statics.login = async function (email, password) {

  const user = await this.findOne({ email })
  if(user)
  {
    const result = await bcrypt.compare(password, user.password)
    console.log(result)
    if(result)
    {
      return user;
    }
    throw Error("Password incorrect")
  }
  throw Error("Email not registered")

}

const Signup = mongoose.model('signup', SignupSchema)

module.exports = { SignupSchema, Signup }