import express, {Request, Response, NextFunction} from 'express'

import globalErrorHandler from './middlewares/globalErrorHandlers';
const app = express();

//routes urls

// http methods: get put post patch delete
app.get('/',(req,res,next)=> {
    
    // test error throw
    // const error = createHttpError(400, "something went wrong")

    // throw error


    res.json({message:"welcome to elib apis"})
});

app.use(globalErrorHandler);

export default app;