const express = require('express')
const router = express.Router()

router.use("/", (req, res) => {
  res.send("I am cart")
})

module.exports = router