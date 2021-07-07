const jwt = require('jsonwebtoken')
const mySecret = process.env['tokenSecret']

const decodeUserId = (token) => {
    try{
      const decodedToken = jwt.verify(token, mySecret)
          console.log("Decoded user id",decodedToken.id)
          return decodedToken.id
        }
      catch(error){
      console.log("Something went wrong in decodeUserId function in utils",error.message)
    }
}
module.exports = { decodeUserId }