import express from "express";
import {createUser} from "./userController"

const useRouter = express.Router();
// create routes 
//we also need to register that routes in the app.route so our app knows that they exist

useRouter.post('/register',createUser)



export default useRouter;