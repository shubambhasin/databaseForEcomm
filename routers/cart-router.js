const express = require('express')
const router = express.Router()
const {Cart} = require('../models/cartModel.js')
const { decodeUserId } = require('../utils/decodeUserId.js')


const AddToCart = async (userId, product, Cart, res) => {

  const cart = await Cart.find({ userId })
  console.log("line 10", cart)
  console.log(product)
 try{
   if(cart.length === 0)
  {
    const newCart = new Cart({
      userId: userId,
      cartItems:[{
        quantity: 1,
        product: product._id
      }],
    })
    await newCart.save()
    const result = await Cart.findById({userId}).populate({
      path: "cartItems.product",
      model: "product"
    })
   return res.json({result})

  }
  else{
    const itemAlreadyPresent = cart[0].cartItems.map(item => item.product === product._id)
    console.log("line 49", itemAlreadyPresent)
    if(itemAlreadyPresent.length === 0 )
    {

      console.log("Item already present")

    }
    else{
      console.log("item not present")
      // const update = await Cart.find({ _id: cart[0]._id})
      const update = await Cart.findByIdAndUpdate( {_id:cart[0]._id}, {
        $push: { 
          cartItems: {             
              quantity: 1,
              product: product._id              
          }}
      })
      console.log("line 70", update)
      console.log("Cart updated")
    }
      const result = await Cart.find({ userId}).populate({
        path: "product.productId",
        model: "product"
      })
      return res.json({result})


  }
 } catch(error)
 {
   console.log(error)
   res.json({success: false, error: error.message})
 }  
}

//delete single product
 
const deleteProduct = async (userId, cartId, productId, res) => {
  try{
      const cart = await Cart.find({ userId })
      if(cart.length === 0)
      {
       return res.status(404).json({success: false, message: "User do not exist"})
      }
      else{
         const result = await Cart.findByIdAndUpdate({ 
         _id: cartId 
      },
      {
        $pull: {
          cartItems: {
                _id: productId
          }
        }
      })
      console.log("item Deleted from")
      res.status(200).json({success: true, message: "Item removed from cart successfully"})
      }
  }catch(error)
  {
    res.status(200).json({success: false, error})
  }
}

const increaseQuantity = async (userId, cartId, productId, res) => {

  try{
    const cart = await Cart.find({ userId })
      if(cart.length === 0)
      {
       return res.status(404).json({success: false, message: "User do not exist"})
      }
      else{
         const result = await Cart.findByIdAndUpdate({ 
         _id: cartId 
      },
      {
        $push: {
          cartItems: {
                _id: productId
          }
        }
      })
      console.log("item Deleted from")
      return res.status(200).json({success: true, message: "Item removed from cart successfully"})
      }
  }catch(error)
  {
    res.status(400).json({success: false, error})
  }
}

router.route("/").
get( async (req, res) => {
   const userId = decodeUserId(req.headers.authorization)
  console.log(userId)
try{
    const cart = await Cart.find({userId}).populate({
      path: "cartItems.product",
      model: "product"
    })
    res.status(200).json({success: true, result: cart})
}
catch(error)
  {
    console.log(error)
    res.json({success: false, error: error.message})
  }
})
.post( async (req, res) => {
  
  const product = req.body
  const token = req.headers.authorization
  const userId = decodeUserId(token)
  // const savedItem = new Cart(data)
  // await savedItem.save()
  // res.json({success: true, product: savedItem })
  console.log("Data from client", product )
  console.log("User id", userId)
  AddToCart(userId, product, Cart, res)
  

})

// clear whole cart

router.route('/')
.delete( async (req, res) => {

  try{
     const token = req.headers.authorization
    const userId = decodeUserId(token)

      const  response =  await Cart.deleteOne({userId})
      console.log(response)
    // RemoveFromWishlist(userId, wishlistProductId, res)
    // await Wishlist.findById(wishlistProductId).remove()

  // await Wishlist.findByIdAndDelete(wishlistProductId)

  res.status(200).send({success: true})
 }
 catch(error)
 {
   res.status(400).send({ success: false, error: "cannot delete"})
 }
})


// delete single item

router
.route("/:productId")
.delete( async( req, res) => {

  const token = req.headers.authorization
 try{
    const {productId} = req.params
    const userId = decodeUserId(token)
    const user = await Cart.find({userId})
    const cartId = user[0]._id
    console.log(productId)
    deleteProduct(userId, cartId, productId, res)

  res.status(200).send({success: true})
 }
 catch(error)
 {
   res.status(400).send({ success: false, error: "cannot delete :("})
 }
})

module.exports = router;