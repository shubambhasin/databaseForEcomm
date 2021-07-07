const express = require('express')
const router = express.Router()
const { Wishlist } = require('../models/wishlistModel')
const { decodeUserId } = require('../utils/decodeUserId.js')
const ObjectId = require('mongodb').ObjectID;

const AddToWishlist = async (userId, product, res) => {

  const wishlist = await Wishlist.find({ userId })
  try {
    if (wishlist.length === 0) {
      const newWishlist = new Wishlist({
        userId: new ObjectId(userId.trim()),
        wishlistItems: [{
          product: product._id
        }]
      })
      await newWishlist.save()
      const result = await Wishlist.findById({ userId })
      res.json({ success: true, result })
    }
    else {
      const itemAlreadyPresent = wishlist[0].wishlistItems.includes(product._id)
      if (itemAlreadyPresent) {
            console.log("Item already present")
      }
      else {
        await Wishlist.findByIdAndUpdate(wishlist[0]._id, {
          $push: { 
            wishlistItems: {
              product: product._id
            }
           }
        })
      }
      const result = await Wishlist.find({ userId }).populate('wishlistItems')
      res.json({ success: true, result })


    }
  } catch (error) {
    console.log(error)
    res.json({ success: false, error: error.message })
  }
}


const RemoveFromWishlist = async (userId, productId, wishlistId, res) => {

  try {
    const wishlist = await Wishlist.find({ userId })
    if (wishlist.length === 0) {
      return res.status(404).json({ success: false, message: "User do not exist" })
    }
    else {
      const result = await Wishlist.findByIdAndUpdate({
        _id: wishlistId
      },
        {
          $pull: {
            wishlistItems: {
              _id: productId
            }
          }
        })
      console.log("item Deleted from")
      res.status(200).json({ success: true, message: "Item removed from wishlist successfully" })
    }
  }
  catch (error) {
    res.status(400).json({ success: false, message: "Cannnot remove from wishlist", error })
  }
}

router.route("/")
  .get(async (req, res) => {
    try {
      const token = req.headers.authorization
      const userId = decodeUserId(token)
      const wishlistData = await Wishlist.find({ userId }).populate({
        path: "wishlistItems.product",
        model: "product"
      })
      res.json({ success: true, wishlistData })
    }
    catch (error) {
      res.send(error)
    }


  })
  .post(async (req, res) => {
    try {

      const product = req.body
      const token = req.headers.authorization
      const userId = decodeUserId(token)
      AddToWishlist(userId, product, res)
    } catch (error) {
      res.json({ error: error }
      )
    }
  })

router
  .route("/")
  .delete(async (req, res) => {
    try {
      // const {wishlistProductId} = req.params
      const token = req.headers.authorization
      const userId = decodeUserId(token)

      const response = await Wishlist.deleteOne({ userId })
      console.log(response)
      // RemoveFromWishlist(userId, wishlistProductId, res)
      // await Wishlist.findById(wishlistProductId).remove()

      // await Wishlist.findByIdAndDelete(wishlistProductId)

      res.status(200).send({ success: true })
    }
    catch (error) {
      res.status(400).send({ success: false, error, message: "cannot delete wishlist" })
    }
  })

router.route('/:productId')
  .delete(async (req, res) => {

    const { productId } = req.params
    console.log("item to be deleted", productId)
    const token = req.headers.authorization

    try {
      const userId = decodeUserId(token)
      const user = await Wishlist.find({ userId })
      const wishlistId = user[0]._id
      console.log("WishlistID", wishlistId)
      RemoveFromWishlist(userId, productId, wishlistId, res)
    }
    catch (error) {
      res.status(400).json({ success: false, error })
    }

  })


module.exports = router;