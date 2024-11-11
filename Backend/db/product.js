const mongoose=require("mongoose")
const {Schema}=mongoose

const productSchema=new mongoose.Schema({
    name:String,
    shortDescription:String,
    description:String,
    purchasePrice:Number,
    discount:Number,
    images:Array(String),
    categoryId:{type:Schema.Types.ObjectId,ref:'categories'},
    brandId:{type:Schema.Types.ObjectId,ref:'brands'},
    isfeatured:Boolean,
    isNew:Boolean

    
})
const product=mongoose.model("products",productSchema)
module.exports=product