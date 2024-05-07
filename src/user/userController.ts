import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import userModel from "./userModel";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import { config } from "../config/config";

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
  
 
  // password hash to store in db.. use bycrypt
  try{
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });
  
    // token generation JWT for security
  
    const token = sign({ sub: newUser._id }, config.jwtSecret as string, {
      expiresIn: "7d",
      algorithm: "HS256",
    });

  }catch(err){
    return next(createHttpError())
  }
 

  //process
  //response
  res.json({
    accessToken: token,
  });
};

export { createUser };
