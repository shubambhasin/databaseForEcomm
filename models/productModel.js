const mongoose = require('mongoose')
const { Schema } = mongoose;
const productData = require('../database/productData.js')

const productSchema = new Schema( {

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

  const Product = mongoose.model("product", productSchema)

  const initializeProducts = async () => {
    try {
      productData.forEach( async (product) => {
        const newProduct = new Product(product)
        const savedProduct = await newProduct.save();
        // console.log(savedProduct)
      })
    }
    catch ( err ){
console.log(err)
    } 
  }

  module.exports = { Product, initializeProducts }