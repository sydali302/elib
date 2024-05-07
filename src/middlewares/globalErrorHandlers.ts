// global error handler
import  {Request, Response, NextFunction} from 'express'
import  {HttpError} from "http-errors"
import {config} from "../config/config"
const globalErrorHandler = (
     err:HttpError,
     req: Request, 
     res: Response, 
     next: NextFunction
    )=>{
    
    const statusCode = err.statusCode || 500;
    return res.status(statusCode).json({
        
        message: err.message,
        // for security use env...detail info of error... dont do that in production.. code things expose
        errorStack:config.env ==="development" ? err.stack : "",

    });
};

export default globalErrorHandler;
