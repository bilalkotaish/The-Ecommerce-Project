
const express=require("express")
const router=express.Router()
const {getAdminOrder,updateordersatus}=require("../handlers/orderhandler")

router.get("",async(req,res)=>{
    const orders=await getAdminOrder()
    res.send(orders)
})

router.post("/:id", async(req, res) => {
    const orderid = req.params.id;
    const status = req.body.status;
    await updateordersatus(orderid, status);
    res.send({message:"order status updated"});
});


module.exports=router
