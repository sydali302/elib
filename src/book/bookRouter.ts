// we need to create book router first

import express from "express";
import {createBook} from "./bookController"

const bookRouter = express.Router();


//routes : every router needs to be register in the app file

bookRouter.post("/",createBook);


export default bookRouter;