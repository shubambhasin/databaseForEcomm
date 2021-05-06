const express = require('express')
const router = express.Router()
const { Product } = require("../models/productModel.js")

router.get('/', async (req, res) => {

  const products = await Product.find()
  console.log(products)
  res.send(products)
})
router.get('/:id', async (req, res) => {
 try{
  const { id } = req.params
  const product = await Product.findById(id)
  res.send([product])
 }
 catch(error)
 {
   res.send({ error: error})
 }
})

module.exports = router;