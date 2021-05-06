const mongoose = require('mongoose')
const { Schema } = mongoose;
const productData = require('../database/productData.js')

const wishlistSchema = new Schema( {

  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true
  },
  price: {
    type: Number
  },
  category: {
    type: String
  },
  brand: {
    type: String
  },
  isPopular: {
    type: Boolean
  },
  isNewest: {
    type: Boolean
  },
  inStock: {
    type: Boolean
  },
  fastDelivery: {
    type: Boolean
  },
  rating: {
    type: Number
  },
  offer: {
    type: Number
  },
  totalPurchase: {
    type: Number
  },
  availableQty: {
    type: Number
  }
  })

  const Wishlist = mongoose.model("wishlist", wishlistSchema)

  module.exports = { Wishlist, wishlistSchema }