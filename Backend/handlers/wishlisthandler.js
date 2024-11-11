const wishlist=require('./../db/wishlist')

async function addToWishlist(userId,productId  ){
    let Wishlist=new wishlist({
        userId:userId,
        productId:productId
    })
    await Wishlist.save()
    return Wishlist.toObject()
}
 
async function getWishlistByUserId(userId){
    let Wishlist=await wishlist.find({userId:userId}).populate('productId')
    return Wishlist.map(x=>x.toObject().productId)
}

async function deleteFromWishlist(userId,productId){
    await wishlist.deleteMany({userId:userId , productId:productId})
    return;
} 


module.exports={addToWishlist,getWishlistByUserId,deleteFromWishlist}