import mongoose from "mongoose";
import {config} from "./config";

const connectDB = async () => {

    try{
       // register event first
        mongoose.connection.on("connected",() =>{
            console.log("Connected to database successfully");
        });

        mongoose.connection.on('error',(err)=>{
            console.log('Error in connecting to database.',err)
        });
        await mongoose.connect(config.databaseURL as string);

    }catch(err){

        console.error("failed to connect to database");
        process.exit(1);

    }
   
};

export default connectDB;