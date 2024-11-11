const express=require('express')
const { getFeaturedProduct, getNewProduct, getProductForListing,getProductByid } = require('../handlers/producthandler')
const {getCategories}=require('./../handlers/categoryhandler')
const {getBrands}=require('./../handlers/brandshandler')
const { getWishlistByUserId ,addToWishlist,deleteFromWishlist} = require('../handlers/wishlisthandler')
const {addToCart,removeFromCart,getCart,clearCart}=require('../handlers/carthandler')
const {placeorder,getorders}=require('../handlers/orderhandler')
const router=express.Router()


router.get("/featured-products",async(req,res)=>{
    const Product=await getFeaturedProduct()
    res.send(Product)
})
router.get("/New-products",async(req,res)=>{
    const Products = await getNewProduct()
    res.send(Products)
})
router.get("/categories",async(req,res)=>{
    const category = await getCategories()
    res.send(category)
})
router.get("/brands",async(req,res)=>{
    const brand = await getBrands()
    res.send(brand)
})
router.get('/products', async (req, res) => {
    try {
        const {
            searchTerm = '',
            categoryId = null,
            brandId = null,
            sortBy = 'price',
            sortOrder = 'desc',
            page = 1,
            pageSize = 10
        } = req.query;

        const products = await getProductForListing(
            searchTerm,
            categoryId, 
            brandId,
            sortBy,
            sortOrder,
            parseInt(page),
            parseInt(pageSize)
        );

        res.send(products);

    } catch (error) {
        res.status(500).send({error: error.message});
    }
});

 router.get("/product/:id",async (req,res)=>{
    const id=req.params['id']
    const Product=await getProductByid(id)
    res.send(Product)
 })
   
 router.get("/wishlist",async (req,res)=>{
    const userId= req.user.id
    const items= await getWishlistByUserId(userId)
    res.send(items)
 }
 )
 router.post("/wishlist/:id",async (req,res)=>{
    const userId= req.user.id
    const productId=req.params.id
    const items= await addToWishlist(userId,productId)
    res.send(items)
 }
 )
 router.delete("/wishlist/:id",async (req,res)=>{
    const userId= req.user.id
    const productId=req.params.id
     await deleteFromWishlist(userId,productId)
    res.send({message:"deleted"})
 }
 )
 router.post("/cart/:id",async (req,res)=>{
    const userId= req.user.id
    const productId=req.params.id
    const quantity=req.body.quantity
   const items= await addToCart(userId,productId,quantity)
    res.send(items)
 }
 )  
 router.delete("/cart/:id",async (req,res)=>{
    const userId= req.user.id
    const productId=req.params.id
    await removeFromCart(userId,productId)
    res.send({message:"deleted from cart"})
 }
 )
 router.get("/cart",async (req,res)=>{
    const userId= req.user.id
    const cartItems=await getCart(userId)
    res.send(cartItems)
 }
 )
 router.post("/order",async (req,res)=>{
    const userId= req.user.id
    const order=req.body
    await placeorder(userId,order)
    await clearCart(userId)
    res.send({message:"order placed"})
 }
 )
 router.get("/order",async (req,res)=>{
    const userId= req.user.id
    const orders=await getorders(userId)
    return res.send(orders)
 }
 )
module.exports=router

