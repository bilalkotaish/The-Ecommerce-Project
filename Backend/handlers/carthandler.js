const cart=require("../db/cart")

async function addToCart(userId,productId,quantity){
    let product=await cart.findOne({userId:userId,productId:productId})

    if(product){
        if(product.quantity+ quantity<=0){
            await removeFromCart(userId,productId)
            
        }else{
            await cart.findByIdAndUpdate(product._id,{quantity:product.quantity+quantity})
        } 
      
    }
    else{
        product=new cart({userId:userId,productId:productId,quantity:quantity})
        await product.save()
    }
}
   
async function removeFromCart(userId,productId){
    await cart.findOneAndDelete({userId:userId,productId:productId})
}
async function getCart(userId){
    const cartItems=await cart.find({userId:userId}).populate("productId")
    return cartItems.map((item)=>{
        return{
        productId:item.productId,
        quantity:item.quantity
        }
    })
}
async function clearCart(userId){
    await cart.deleteMany({userId:userId})
}
module.exports={addToCart,removeFromCart,getCart,clearCart}
