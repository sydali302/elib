import mongoose from "mongoose";
import {User} from "./userTypes";

const userSchema = new mongoose.Schema<User>(
    {
    name:{
        type: String,

        requried: true
    },
    email:{
        type: String,
        unique:true,
        requried:true,
    },
    password: {
        type: String,
        requried: true,
    }
},
{timestamps: true},

);
//create model
export default mongoose.model<User>('User',userSchema)