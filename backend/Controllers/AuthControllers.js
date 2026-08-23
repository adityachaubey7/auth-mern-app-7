const UserModel = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt=require('jsonwebtoken')
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({
          message: "user already exist you can login now ",
          success: false,
        });
    }
    const userModel = new UserModel({ name, email, password });
    userModel.password = await bcrypt.hash(password, 10);
    await userModel.save();
    res.status(201)
    .json({ 
        message: "signup succesfully" ,
        success:true,
    });
  } catch (err) {
    console.error("SIGNUP ERROR:", err);
    res.status(500)
        .json({
            message:"internal server error",
            success:false
        })
  }
};

const login=async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user =await UserModel.findOne({email})
        if(!user){
            return res.status(403)
                .json({
                    message:"user not exist ",
                    success:false
                })

        }
        const isPassEqual=await bcrypt.compare(password,user.password);
        if(!isPassEqual){
            return res.status(403)
                .json({
                    message:"user not exist ",
                    success:false
                })
        }
        const jwtToken= jwt.sign(
          {email:user.email,_id:user._id},
          process.env.JWT_SECRET,
          {expiresIn:'24h'}
        )
        res.status(202)
            .json({
                message:"login success",
                success:true,
                token:jwtToken,
                email:user.email, 
                name:user.name
            })
    }
    catch(err){
        res.status(500)
            .json({
                message:"internal server error",
                success:false
            })
    }
}
module.exports = {
  signup,
  login
};
