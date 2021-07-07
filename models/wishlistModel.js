const mongoose = require('mongoose')
const { Schema } = mongoose;
const productData = require('../database/productData.js')

const wishlistSchema = new Schema( {

 userId: {
    type: Schema.Types.ObjectId,
    ref: 'signup'
  },
  wishlistItems: [
     {
       product: {
        type: Schema.Types.ObjectId,
        ref: "product"
      }
     }
    ],
  })
 

  const Wishlist = mongoose.model("wishlist", wishlistSchema)

  module.exports = { Wishlist, wishlistSchema }