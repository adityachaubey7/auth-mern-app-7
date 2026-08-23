const {signupValidation}=require("../Middlewares/AuthValidation")
const {loginValidation}=require("../Middlewares/AuthValidation")
const {signup}=require("../Controllers/AuthControllers")
const {login}=require("../Controllers/AuthControllers")
const router=require('express').Router()


router.post("/login",loginValidation,login)
router.post("/signup",signupValidation,signup)
module.exports=router;
