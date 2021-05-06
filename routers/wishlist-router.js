const express = require('express')
const router = express.Router()
const {Wishlist} = require('../models/wishlistModel')
router.route("/")
.get( async (req, res) => {
    try{
      
  const wishlistData = await Wishlist.find()
  res.send(wishlistData)
    }
    catch(error)
    {
      res.send(error)
    }


})
.post(async(req, res) => {
  try{
    
  const newWishlistData = req.body
  const savedWishlistData = new Wishlist(newWishlistData)
  await savedWishlistData.save()

  res.json({ success: true})
  } catch(error)
  {
    console.log(error)
  }

})

router
.route("/:wishlistProductId")
.delete( async( req, res) => {
 try{
    const {wishlistProductId} = req.params
    console.log(wishlistProductId)

    await Wishlist.findById(wishlistProductId).remove()

  // await Wishlist.findByIdAndDelete(wishlistProductId)

  res.status(200).send({success: true})
 }
 catch(error)
 {
   res.status(400).send({ success: false, error: "cannot delete :("})
 }
})


module.exports = router;