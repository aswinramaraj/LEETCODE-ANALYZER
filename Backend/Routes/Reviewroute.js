const express = require('express')
const Storereview = require('../Controllers/Review')
const router = express.Router()



router.post('/storereview',Storereview)

module.exports = router