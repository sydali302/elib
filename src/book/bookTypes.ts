// here are types of data for model 
import { User } from "../user/userTypes";

export interface Book{
    _id: string;
    title: string;
    author: User;
    genre: string;
    coverImage: string;
    file: string;
    createdAt: Date;
    updateAt: Date;
}