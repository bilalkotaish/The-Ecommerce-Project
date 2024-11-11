const express=require('express')
const { registerUser, loginUser } = require('../handlers/Authhandler')
const router=express.Router()


router.post("/register",async(req,res)=>{
    let model=req.body
    if(model.name&&model.email&&model.password){
        await registerUser(model)
        res.send({
            message:"User Registered "
        })
    }else{
        res.status(400).json({
           error:"Please Provide A Valid Input",
        })
    }
})
router.post("/login",async(req,res)=>{
    let model=req.body
    if(model.email && model.password){
       const result= await loginUser(model)
       if(result){
        res.send(result)
       }else{
        res.status(400).json({
            error:"Please Provide A Valid Email or Password",
         })
       }
      
    }else{
        res.status(400).json({
           error:"Please Provide A Valid Input",
        })
    }
})






module.exports=router