const express = require('express')
const productController = require('../Controllers/productController')
const userController = require('../Controllers/userController')
const jwtMiddleware = require('../Middlewares/jwtMiddleware')
const wishlistController = require('../Controllers/wishlistController')
const cartController = require('../Controllers/cartController')

const router = new express.Router()

// get all products 
router.get('/products/all',productController.getAllProductsController)

// register user
router.post('/user/register',userController.registerController)

// login user
router.post('/user/login',userController.loginController)

// getproduct
router.get('/product/get/:id',productController.getProductController)

// addToWishlist
router.post('/wishlist/add',jwtMiddleware,wishlistController.addToWishlistController)

// get wishlist
router.get('/wishlist/get-allproducts',jwtMiddleware,wishlistController.getWishlistController)

// remove product
router.delete('/wishlist/remove/:id',jwtMiddleware,wishlistController.removeWishlistItemController)

// addtocart
router.post('/cart/add',jwtMiddleware,cartController.addToCartController)

// getcart

router.get('/cart/get-allproduct',jwtMiddleware,cartController.getCartController)

module.exports = router