// we need to create book router first

import express from "express";
import {createBook} from "./bookController"

const bookRouter = express.Router();


//routes

bookRouter.post("/",createBook);


export default bookRouter;