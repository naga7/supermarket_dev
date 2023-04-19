const express= require("express")
const cors =require("cors")

const app = express()
app.use(cors())
//=======================================
require("../database/connction")
//=======================================
const path = require ("path")
app.use(express.static(path.join(__dirname,"../public")))
//============================================
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//========================================
const userRoutes =require("../routes/user_routs")
app.use("/api/user",userRoutes)
const productRoutes =require("../routes/product_routes")
app.use("/api/product",productRoutes)
app.all("*", (req,res)=> 
    res.status(404).send({ apiStatus: false, data:null, message:"invalid url" })
)
//===============================
module.exports = app