const wishlist = require('../Models/wishlistModel')

exports.addToWishlistController = async (req,res)=>{
    // get product id
    const {id,title,price,description,category,image,rating}= req.body


    // get userId
    const userId = req.payload

    try{
        const existingUser = await wishlist.findOne({id,userId})
        console.log(existingUser);
        if(existingUser){
            res.status(406).json("Product already exist in your wishlist")
        }else{
            const newProduct = new wishlist({
                id,title,price,description,category,image,rating,userId
            })
            await newProduct.save()
            res.status(200).json(newProduct)
        }
    }catch(err){
        res.status(401).json(err)
    }
}

// get wishlist

exports.getWishlistController = async (req,res)=>{
    const userId = req.payload
    try{
        const allProducts = await wishlist.find({userId})
        res.status(200).json(allProducts)
    }catch(err){
        res.status(401).json(err)
    }
}

exports.removeWishlistItemController = async (req,res)=>{
    const {id}=req.params
    try{
        const removeItem = await wishlist.findByIdAndDelete({_id:id})
        res.status(200).json('deleted')
    }catch(err){
        res.status(401).json(err)
    }
}