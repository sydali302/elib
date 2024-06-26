// we need to create book router first

import express from "express";
import { createBook } from "./bookController";
import multer from "multer";
import path from "node:path";

const bookRouter = express.Router();

//file store local -->
const upload = multer({
  dest: path.resolve(__dirname, "../../public/data/uploads"),
  limits: { fileSize: 1e8 }, // 30MB
});

//routes : every router needs to be register in the app file
// middleware is placed b/w the router and controller
// below is custom middleware but multer is builtin middleware
bookRouter.post("/", upload.fields([
    {name:'coverImage', maxCount:1},
    {name:'file',maxCount:1}
]), createBook);

export default bookRouter;
