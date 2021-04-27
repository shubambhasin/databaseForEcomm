const express = require('express')
const app = express()
const router = express.Router()
const { Product } = require("../models/productModel.js")

router.get('/', async (req, res) => {

  const products = await Product.find()
  console.log(products)
  res.send(products)
})
router.get('/:id', async (req, res) => {

  const { id } = req.params
  const product = await Product.findById(id)
  res.send(product)

})

module.exports = router;