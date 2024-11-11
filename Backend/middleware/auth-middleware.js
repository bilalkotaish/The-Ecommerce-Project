const jwt=require('jsonwebtoken')

function verifyToken(req,res,next){
    const token=req.header('Authorization')
    if(!token){
        return res.status(400).json({
            message:"Access denied"
        })
    }
    try{
        const decode=jwt.verify(token,"secret")
        req.user=decode
        next()
    }catch(err){
        return res.status(400).json({
            message:"invalid token"
        })
    }
}
function isAdmin(req,res,next){
 if (req.user && req.user.isAdmin){
    next()
 }else{
    return res.status(403).json({
        error:"Forbidden"
    })
 }
}
module.exports={verifyToken,isAdmin}