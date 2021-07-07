
const jwt = require('jsonwebtoken')
const mySecret = process.env['tokenSecret']

const secret = mySecret
const authenticateRoutes = (req, res, next) => {
  const token = req.headers.authorization
  // console.log("token in authenticateRoutes",token)
  if(token)
  {
    jwt.verify(token, secret, ( error, decodeToken) => {
      if(error)
      {
        console.log("Error from auth verify:", error.message)
        res.json({error: error.message})
      }
      else{
        console.log("User verified")
        next()
      }
    })
  } else {
    console.log("No auth token in authenticateRoutes")
    res.json({error: "No auth token recieved"})
  }
}
module.exports = { authenticateRoutes }