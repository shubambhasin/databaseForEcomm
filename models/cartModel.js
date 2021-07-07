const mongoose = require('mongoose')
const { Schema } = mongoose;
const productData = require('../database/productData.js')


const cartSchema = new Schema( {

    userId: { 
      type: Schema.Types.ObjectId,
      ref: "signup"},
    cartItems: [
      {
      quantity: {
        type: Number
      },
      product: {
        type: Schema.Types.ObjectId,
        ref: "product"
      }
    }]
  })
 const Cart = mongoose.model("cart", cartSchema)

//   const initializeProducts = async () => {
//     try {
//       productData.forEach( async (product) => {
//         const newProduct = new Product(product)
//         const savedProduct = await newProduct.save();
//         // console.log(savedProduct)
//       })
//     }
//     catch ( err ){
// console.log(err)
//     } 
//   }

  module.exports = { Cart, cartSchema }