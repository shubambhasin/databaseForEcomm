const express = require('express')
const mySecret = process.env['mongooseUrl']
const app = express();
const bodyParser = require("body-parser")
const productRouter = require('./routers/product-router')
const connectDatabase = require('./database/dbConnect')

app.use(bodyParser)

connectDatabase()


app.get('/', (req, res) => {
  res.send("I am a database")
})

app.use('/products', productRouter)

app.listen(3000, () => {
  console.log("Listening on port: 3000")
})