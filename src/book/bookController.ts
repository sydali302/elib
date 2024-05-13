// first we make the controller of any thing. what all is in container is the 
// req and response and NextFunction 
import {Request, Response, NextFunction} from "express";

const createBook = async (
    req: Request,
    res: Response,
    next: NextFunction
)=>{
res.json({});
};

export {createBook}