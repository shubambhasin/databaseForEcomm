const { Cart } = require('../models/cartModel')

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

module.exports = deleteProduct