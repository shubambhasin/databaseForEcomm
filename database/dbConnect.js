const mongoose = require('mongoose')

const mySecret = process.env['databaseUrl']

const connectDatabase = async () => {

  try {
    await mongoose.connect(mySecret, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log("Connect to db successfully")
  } catch(err)
  {
    console.log("connection failed, error:", err )
  }

}

module.exports = connectDatabase