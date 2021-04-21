const express = require('express')
const app = express()
const router = express.Router()
const { Product } = require("../models/productModel.js")

router.get('/', async (req, res) => {

  const products = await Product.find()
  console.log(products)
  res.json({data: products})
})

module.exports = router;