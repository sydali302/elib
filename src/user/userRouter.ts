import express from "express";

const useRouter = express.Router();
// create routes 
//we also need to register that routes in the app.route so our app knows that they exist
useRouter.post('/register',(req,res)=>{
    
    res.json({message:"user registered"});
})



export default useRouter;