import express from 'express'

const app = express();

//routes urls

// http methods: get put post patch delete
app.get('/',(req,res,next)=> {
    res.json({message:"welcome to elib apis"})
})

export default app;