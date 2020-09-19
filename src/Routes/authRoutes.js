const express = require( "express");
const mongoose = require("mongoose")
const User = mongoose.model("User")
const jwt = require("jsonwebtoken")
const router= express.Router();

router.post("/signup",async(req,res)=>{
       const {email,password} = req.body;
       try{
       const user = new User({email,password})
       await user.save();
       const token = jwt.sign({userId:user._id},"MY_SECRET_KEY")
       res.send({token})
       }catch(err){
           return res.status(422).send(err.message)
       }
    

})

router.post("/signin",async(req,res)=>{
    const{email,password} = req.body
    if(!email || !password){
        res.status(422).send({error:"Must provide email or password"});
    }
   const user = await User.findOne({email});
   if(!user){
       res.status(422).send({error:"invalid password or email"})
   }
try{
   await user.comparePassword(password);
   const token = jwt.sign({userId:user._id}, "MY_SECRET_KEY")
   res.send({token})
} catch(err){
    res.status(422).send({err:"password or email incorrect"});
}


})




module.exports = router