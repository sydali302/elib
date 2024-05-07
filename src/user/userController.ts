import { Request,Response,NextFunction } from "express";
import createHttpError from "http-errors";

const createUser = async (
    req:Request,
    res:Response,
    next:NextFunction
)=>{
    //step 1 in create user is validation
    // 3 things name , email , password

    const {name, email, password} = req.body;
// some time by default express does not extract json we have to explicit define middleware for it.


    //validation
    if(!name || !email || !password){
        
        const error = createHttpError(400,'All fields are requried')

        // to pass error to global error handler
        return next(error)
    }
    
    //process
    //response
res.json({
    message:"User Created"
});

};

export {createUser};