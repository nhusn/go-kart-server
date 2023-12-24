const cart = require('../Models/cartModel')

// addToCart

exports.addToCartController = async (req, res) => {
    const userId = req.payload
    const { id, title, price, description, category, image, rating, quantity } = req.body
    try {
        const existingProduct = await cart.findOne({ id, userId })
        if (existingProduct) {
            existingProduct.quantity += 1
            existingProduct.grandTotal = existingProduct.quantity * existingProduct.price
            await existingProduct.save()
            res.status(200).json('items added to your cart')
        } else {
            const newProduct = new cart({
                id, title, price, description, category, image, rating, quantity, grandTotal: price, userId
            })
            await newProduct.save()
            res.status(200).json('item added to your cart')
        }
    } catch (err) {
        res.status(401).json(err)
    }
}

// getcart

exports.getCartController = async (req, res) => {
    const userId = req.payload
    try {
        const allproducts = await cart.find({ userId })
        console.log(allproducts);
        res.status(200).json(allproducts)
    } catch (err) {
        res.status(401).json(err)
    }
}

// increment quantity

exports.incrementCartController = async (req, res) => {
    const { id } = req.params
    try {
        const selectedProduct = await cart.findOne({ _id: id })
        if (selectedProduct) {
            selectedProduct.quantity += 1
            selectedProduct.grandTotal = selectedProduct.quantity * selectedProduct.price
            await selectedProduct.save()
            res.status(200).json('Quantity incremented')
        } else {
            res.status(404).json("Product not found")
        }
    } catch (err) {
        res.status(401).json(err)
    }
}

exports.decrementCartController = async (req, res) => {
    const { id } = req.params
    try {
        const selectedProduct = await cart.findOne({ _id:id})
        if (selectedProduct) {
            selectedProduct.quantity -= 1
            if (selectedProduct.quantity==0) {
                await cart.deleteOne({ _id: id })
                res.status(200).json('Item Removed')
            } else {
                selectedProduct.grandTotal = selectedProduct.quantity * selectedProduct.price
                await selectedProduct.save()
                res.status(200).json('Quantity Decremented')
            }

        } else {
            res.status(404).json("Product not found")
        }
    } catch (err) {
        res.status(401).json(err)
    }
}

// remove item

exports.removeCartController = async (req,res)=>{
    const {id}=req.params
    try{
        await cart.deleteOne({_id:id})
        res.status(200).json('deleted')
    }catch(err){
        res.status(401).json(err)
    }
}

exports.emptyCartController = async (req,res)=>{
    const userId = req.payload
    try{
        await cart.deleteMany({userId})
        res.status(200).json('All items removed')
    }catch(err){
        res.status(401).json(err)
    }
}