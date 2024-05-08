import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import userModel from "./userModel";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import { config } from "../config/config";
import {User} from "./userTypes"

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  //step 1 in create user is validation
  // 3 things name , email , password

  const { name, email, password } = req.body;
  // some time by default express does not extract json we have to explicit define middleware for it.

  //validation
  if (!name || !email || !password) {
    const error = createHttpError(400, "All fields are requried");

    // to pass error to global error handler
    return next(error);
  }
  // check if th user already exist for this need db,, call db here

  //const user = await userModel.findOne({email: email})
  // in js if key and value are same then you can write this as
  //db call
  try{
    const user = await userModel.findOne({ email });

    if (user) {
        const error = createHttpError(400, "user already exist with this email");
        return next(error);
      }
    

  }catch(err){

    return next(createHttpError(500, "Error while getting user"));

  }
  
 let newUser:User;
  // password hash to store in db.. use bycrypt
  try{
    const hashedPassword = await bcrypt.hash(password, 10);

    newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });
  
    // token generation JWT for security
  
   

  }catch(err){
    return next(createHttpError())
  }

  try{

    // token generation JWT
  const token = sign({ sub: newUser._id }, config.jwtSecret as string, {
    expiresIn: "7d",
    algorithm: "HS256",
  });
  res.status(201).json({
    accessToken: token,
  });

  }catch(err){

    return next(createHttpError(500,"Error while signing the jwt token"))
  }

  
  
  //process
  //response
 
};

const loginUser = async(req:Request, res: Response, next: NextFunction) => {
  const {email, password} = req.body;

  if(!email || !password){
    return next(createHttpError(400,"All fields are requried"));
  }

  const user = await userModel.findOne({email});

  if(!user){
    return next(createHttpError(404,"user not found."));
  }

  const isMatch = await bcrypt.compare(password, user.password)

  if(!isMatch){
    return next(createHttpError(400,"Username or password incorrect! "));
  }

  //
  // todo 
  // if match generate new access token

  const token = sign({sub: user._id}, config.jwtSecret as string,{
    expiresIn:"7d",
    algorithm:"HS256",
  });

  res.json({accessToken: token});
}

export { createUser, loginUser };
