const Order=require("../db/order")

async function placeorder(userId,order){
    let neworder=new Order({...order,userId:userId,status:"pending"})
    await neworder.save()
    
}
async function getorders(userId){
    let orders=await Order.find({userId:userId})
    return orders.map(x=>x.toObject())
}
async function getAdminOrder() {
    let orders=await Order.find()
    return orders.map((x)=>x.toObject())
}

async function updateordersatus(id, status) {
    await Order.findByIdAndUpdate(id, { status: status });
   return { message: "order status updated" };  // Return a proper JSON object
}




module.exports={placeorder,getorders,getAdminOrder,updateordersatus}
