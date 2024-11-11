const express=require('express')
const { AddProduct, getProducts, getProductByid, updateProduct, deleteProduct } = require('../handlers/producthandler')
const router=express.Router()


router.post("",async (req,res)=>{
    let model=req.body
    let result=await AddProduct(model)
     res.send(result)
 
 })
 router.get("",async (req,res)=>{
     let result=await getProducts()
      res.send(result)
  
  })
  router.get("/:id",async (req,res)=>{
     let id=req.params['id']
     let result=await getProductByid(id)
      res.send(result)
  
  })
 router.put("/:id",async (req,res)=>{
     let model=req.body
     let id=req.params['id']
     await updateProduct(id,model)
     res.send({message:"updated"})
 
 })
 router.delete("/:id",async (req,res)=>{
     let id=req.params['id']
     await deleteProduct(id)
     res.send({message:"deleted"})
 })
 module.exports=router