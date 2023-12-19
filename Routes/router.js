const express = require('express')
const productController = require('../Controllers/productController')
const userController = require('../Controllers/userController')

const router = new express.Router()

// get all products 
router.get('/products/all',productController.getAllProductsController)

// register user
router.post('/user/register',userController.registerController)

// login user
router.post('/user/login',userController.loginController)

module.exports = router