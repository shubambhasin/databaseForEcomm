const express = require('express')
const mySecret = process.env['mongooseUrl']
const app = express();
const cors = require('cors')
const productRouter = require('./routers/product-router')
const cartRouter = require('./routers/cart-router')
const wishlistRouter = require('./routers/wishlist-router')
const connectDatabase = require('./database/dbConnect')
const database = require('./database/productData.js');
const { initializeProducts } = require("./models/productModel")
const signupRouter = require('./routers/signup-router.js')
const usersRouter = require('./routers/user-router.js')
const mongoose = require('mongoose')
app.use(cors())
app.use(express.json());
connectDatabase();

//  !!!!! Attention -> have to run to add products to db
// initializeProducts()
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

app.get('/', (req, res) => {
  res.send("I am a database")
})

app.use('/products', productRouter)
app.use('/cart', cartRouter)
app.use('/wishlist', wishlistRouter)
app.use('/signup', signupRouter)
app.use('/signin', usersRouter)


app.listen(3000, () => {
  console.log("Listening on port: 3000")
})