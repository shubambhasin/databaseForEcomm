const express = require('express')
const router = express.Router()
const {Cart} = require('../models/cartModel.js')
const { decodeUserId } = require('../utils/decodeUserId.js')


const AddToCart = async (userId, product, Cart, res) => {
  const cart = await Cart.find({ userId })
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
    const result = await Cart.find({userId}).populate({
      path: "cartItems.product",
      model: "product"
    })
   return res.json({success: true, result})
  console.log("Added to cart")
  }
  else{
    // const itemAlreadyPresent = cart[0].cartItems.includes(product._id)
    const itemAlreadyPresent = cart[0].cartItems.filter((data) => data.product == product._id)
    console.log("line 49", itemAlreadyPresent)
    if(itemAlreadyPresent.length !== 0 )
    {
      console.log("Item already present")
      res.status(400).json({success: false, message: "Item already in cart"})
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
      console.log("Cart updated, line 47")
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


const increaseQuantity = async (userId, cartId, product, productId, res) => {
        try{
         const update1 = await Cart.findByIdAndUpdate({_id:cartId}, {
          $pull: { 
            cartItems: {     
                product: productId              
            }}
      })
          const update2 = await Cart.findByIdAndUpdate({_id:cartId}, {
          $push: { 
            cartItems: {
              quantity: product.quantity+1,
                product: productId              
            }}
      })
      res.status(200).json({success: true, result: update2})
        }catch(error){
          res.json({error})
        }
}
const decreaseQuantity = async (userId, cartId, product, productId, res) => {
        try{
         const update1 = await Cart.findByIdAndUpdate({_id:cartId}, {
          $pull: { 
            cartItems: {     
                product: productId              
            }}
      })
          const update2 = await Cart.findByIdAndUpdate({_id:cartId}, {
          $push: { 
            cartItems: {
              quantity: product.quantity-1,
                product: productId              
            }}
      })
      res.status(200).json({success: true, result: update2})
        }catch(error){
          res.json({error})
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
.post( async (req, res) => {

  const token = req.headers.authorization
  const product = req.body
 try{
    const {productId} = req.params
    const userId = decodeUserId(token)
    const user = await Cart.find({userId})
    const cartId = user[0]._id
    console.log(productId)
    increaseQuantity(userId, cartId, product, productId, res)

    res.status(200).send({success: true})
 }
 catch(error)
 {
   res.status(400).send({ success: false, error: "cannot delete :("})
 }

})
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