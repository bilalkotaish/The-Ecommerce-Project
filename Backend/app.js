const express = require("express")
const mongoose = require("mongoose")
const app = express();
const port = 8000;
const cors = require('cors')
const Categoryroute = require("./routes/categoryroute")
const Brandroute = require("./routes/Brandroute")
const Productroute=require("./routes/productroute")
const Customerroute=require("./routes/customer")
const Orderroute=require('./routes/order')
const Authroute=require("./routes/Auth");
const { verifyToken ,isAdmin} = require("./middleware/auth-middleware");
app.use(express.json())
app.use(cors())
app.get('/', (req, res) => {
    res.send("server running")
})
app.use("/category",verifyToken,isAdmin,Categoryroute)
app.use("/brand",verifyToken,isAdmin,Brandroute)
app.use("/order",verifyToken,isAdmin,Orderroute)
app.use("/product",verifyToken,isAdmin,Productroute)
app.use("/customer",verifyToken,Customerroute)
app.use("/auth",Authroute)
async function connectdb() {
    await mongoose.connect("mongodb://localhost:27017", {
        dbName: "Ecommerce-Store"
    })
    console.log("database connected successfully")
}
connectdb().catch((err) => {
    console.log("error connecting to database")
})
app.listen(port, () => {
    console.log("server has been started", port)

})