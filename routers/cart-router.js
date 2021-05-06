const express = require('express')
const router = express.Router()
const {CartSchema,Cart} = require('../models/cartModel.js')



router.route("/").
get( async (req, res) => {

  try{
    const data = await Cart.find()
    res.send(data)

  } catch(error)
  {
    res.send({error: error})
  }

})
.post( async (req, res) => {
  
  const data = req.body
  const savedItem = new Cart(data)
  await savedItem.save()
  res.json({success: true, product: savedItem })

})

router
.route("/:cartProductId")
.delete( async( req, res) => {
 try{
    const {cartProductId} = req.params
    console.log(cartProductId)

    await Cart.findById(cartProductId).remove()

  // await Wishlist.findByIdAndDelete(wishlistProductId)

  res.status(200).send({success: true})
 }
 catch(error)
 {
   res.status(400).send({ success: false, error: "cannot delete :("})
 }
})

module.exports = router;