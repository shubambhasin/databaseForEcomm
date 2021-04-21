const express = require('express')
const mySecret = process.env['mongooseUrl']
const app = express();
const cors = require('cors')
const productRouter = require('./routers/product-router')
const connectDatabase = require('./database/dbConnect')
const database = require('./database/productData.js');
const { initializeProducts } = require("./models/productModel")
app.use(cors())
app.use(express.json());
connectDatabase();

//  !!!!! Attention -> have to run to add products to db
// initializeProducts()


app.get('/', (req, res) => {
  res.send("I am a database")
})

app.use('/products', productRouter)

app.listen(3000, () => {
  console.log("Listening on port: 3000")
})