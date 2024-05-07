import {config as conf} from 'dotenv';
conf(); 
const _config = {
    port: process.env.PORT,
    databaseURL: process.env.MONGO_CONNECTION_STRING,
    env: process.env.NODE_ENV,
};


// through freez it become read only
export const config = Object.freeze(_config);