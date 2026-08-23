
const express=require('express')
const app=express()
const cors=require('cors')
require('dotenv').config();
require('./Models/db')
const AuthRouter=require("./Routes/AuthRouter")
const bodyParser=require("body-parser")
const ProductsRouter=require("./Routes/ProductsRouter")
const PORT=process.env.PORT ||8080


app.get("/",(req,res)=>{
    res.send('hello')
})
app.use(bodyParser.json())
app.use(cors())
app.use("/auth",AuthRouter)
app.use("/products",ProductsRouter)
app.listen(PORT)
