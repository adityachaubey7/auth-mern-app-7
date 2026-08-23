const ensureAuthenticated=require('../Middlewares/Auth')
const router=require("express").Router()
router.get("/",ensureAuthenticated,(req,res)=>{
    return res.status(200).json([
        {
           name:"mobile",
           prize:12000
        },
        {
            name:"tv",
            prize:14000
         },
    ])
})
module.exports=router;