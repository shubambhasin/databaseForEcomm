const mongoose = require('mongoose')
const databaseUrl = process.env['mongooseUrl']
')
const connectDatabase = async () => {

  try {
    await mongoose.connect(databaseUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log("Connect to db successfully")
  } catch(err)
  {
    console.log("connection failed, error:", err )
  }

}

module.exports = {connectDatabase};