// first we make the controller of any thing. what all is in container is the
// req and response and NextFunction
import { Request, Response, NextFunction } from "express";
import cloudinary from "../config/cloudinary";
import path from "node:path";
import createHttpError from "http-errors";

const createBook = async (req: Request, res: Response, next: NextFunction) => {
  console.log("files", req.files);

  
    const files = req.files as { [filename: string]: Express.Multer.File[] };
    const coverImageMimeType = files.coverImage[0].mimetype.split("/").at(-1);

    const fileName = files.coverImage[0].filename;
    const filePath = path.resolve(
      __dirname,
      "../../public/data/uploads",
      fileName
    );
    try {
    // upload files getting to cloudinary
    const uploadResult = await cloudinary.uploader.upload(filePath, {
      filename_override: fileName,
      folder: "book-covers",
      format: coverImageMimeType,
    });

    const bookFileName = files.file[0].filename;
    const bookFilePath = path.resolve(

        __dirname,
        "../../public/data/uploads",
        bookFileName
    );



    

    console.log("upload result", uploadResult);

 
    const bookFileUploadResult = await cloudinary.uploader.upload(bookFilePath,{

        resource_type:"raw",
        filename_override:bookFileName,
        folder:"book-pdfs",
        format:"pdf"
    });

    console.log("Book file upload Result", bookFileUploadResult);
  }catch (err) {
    console.log(err);
    return next(createHttpError(500, "Error while uploading the files."));
  }
  res.json({});
  // send files via api in multi part form data
  // Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files.
};

export { createBook };
