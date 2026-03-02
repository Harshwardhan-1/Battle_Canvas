import {Request,Response,NextFunction} from 'express';
import { userModel } from '../models/userModel';
import bcrypt from 'bcrypt';
import { JWT_SECRET } from '../configs/env.config';
import jwt from 'jsonwebtoken';
import { checkUserInfomation } from '../validation/checkUserInfo.Validation';
import { oldUserValidation } from '../validation/checkUserInfo.Validation';









export const addUser=async(req:Request,res:Response,next:NextFunction)=>{
    try{
const {name,userName,email,password,confirmPassword}=req.body;
if(!name || !userName || !email || !password || !confirmPassword){
    return res.status(400).json({
        message:"provide proper detail",
    });
}
const result=checkUserInfomation.safeParse({name,userName,email,password});
if(!result.success){
    return res.status(400).json({
        message:result.error.issues[0].message,
    });
}
const checkIt=await userModel.findOne({email});
if(checkIt){
    return res.status(400).json({
        message:"email already exist with this account",
    });
}
if(password!=confirmPassword){
    return res.status(400).json({
        message:"password and confirm password dont match",
    })
}
bcrypt.genSalt(12, function(err, salt) {
    bcrypt.hash(password, salt,async function(err, hash) {
        const createUser=await userModel.create({
            name,
            userName,
            email,
            password:hash,
            confirmPassword:hash,
            role:"player",
        });
         let token=jwt.sign({userId:createUser._id,name:name,email:email},JWT_SECRET as string);
         res.cookie("token",token,{
            httpOnly:true,
            secure:true,
            sameSite:"none"
         });
         return res.status(201).json({
            message:"successfull",
            data:createUser,
         })
    });
});
}catch(err){
    return res.status(500).json({
        message:"internal server error",
    })
}

}











export const oldUser=async(req:Request,res:Response,next:NextFunction)=>{
try{
const {email,password}=req.body;
const result=oldUserValidation.safeParse({email,password});
if(!result.success){
    return res.status(400).json({
        message:result.error.issues[0].message,
    });
}
const oldUser=await userModel.findOne({email});
if(!oldUser){
    return res.status(400).json({
        message:"email not found",
    });
}
bcrypt.compare(password, oldUser.password, function(err, result) {
if(!result){
    return res.status(400).json({
        message:"password doesn't match",
    });
}
let token=jwt.sign({userId:oldUser._id,name:oldUser.name,email:oldUser.email},JWT_SECRET as string);
res.cookie("token",token,{
httpOnly:true,
secure:true,
sameSite:"none",
});
return res.status(200).json({
    message:"successfull",
    data:oldUser,
});
});
}catch(err){
    next(err);
}

}