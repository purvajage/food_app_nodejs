const usermodel=require("../models/usermodel");
const bcrypt=require("bcryptjs");
const JWT=require("jsonwebtoken");

//register
const registercontroller=async(req,res)=>{
    try{
        const{userName,email,password,phone,address,answer}=req.body;
        //validation
        if(!userName || !email || !password || !address || !phone || !answer){
            return res.status(500).send({
                sucess:false,
                message:"please provide all filed",
            });
        }
        //check user
        const existing=await usermodel.findOne({email});
        if(existing){
            return res.status(500).send({
                sucess:false,
                message:"email already registered please login";
            });
         }
         //hashing password
         var salt=bcrypt.genSaltSync(10);
         const hashedpassword=await bcrypt.hash(password,salt);
         //create new user
         const user=await usermodel.create({
            username,
            email,
            password:hashedpassword;
            address,
            phone,
            answer,

         });
         res.status(201).send({
            sucess:true,
            message:"sucessfully registered",
            user,
    });
         }catch(error){
            console.log(error);
            res.status(500).send({
                sucess:false,
                message:"error",
                error
            });
         }
    };

//login
const logincontroller=async(req,res)=>{
    try{
        const{email,password}=req.body;
        //valid function
        if(!email || !password){
            return res.status(500).send({
                sucess:false,
                message:"please provide email or password",
            });
        }
        //check user password | compare password
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(500).send({
                sucess:false,
                message:"invalid credentials",
            });
        }
        //token
        const token=JWT.sign({id:user._id},process.env.JWT_SECRET,{
            expiresIn:"7d",
        });
        user.password=undefined;
        res.status(200).send({
            sucess:true,
            message:"login sucessfully",
            token,
            user,
     });
    }catch(error){
        console.log(error);
        res.status(500).send({
            sucess:false,
            message:"error in login api",
            error,
        });
    }
};
module.exports={registercontroller,logincontroller};