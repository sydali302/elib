import express, {Request, Response, NextFunction} from 'express'

import globalErrorHandler from './middlewares/globalErrorHandlers';
import useRouter from './user/userRouter';
import { createUser } from './user/userController';
import bookRouter from './book/bookRouter';


const app = express();
app.use(express.json());

//routes urls

// http methods: get put post patch delete
app.get('/',(req,res,next)=> {
    
    // test error throw
    // const error = createHttpError(400, "something went wrong")
    // throw error
    res.json({message:"welcome to elib apis"})
});

app.use("/api/users", useRouter);
app.use(globalErrorHandler);
// registration of book routers
app.use('/api/books', bookRouter);

export default app;