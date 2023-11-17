require('dotenv').config()
require('express-async-errors')
const express = require("express")
const morgan = require('morgan')
require('./db'); 
const app = express()
const userRouter = require('./routes/user');
const { errorHandler } = require('./middlewares/error');
const PORT = process.env.PORT || 8000
// MVC - Modal View Controller
// This method will convert everythig comming from our frontend to this JSON for me.
app.use(express.json())
app.use(morgan('dev'))
//user model
app.use("/api/user",userRouter)

app.use(errorHandler)

app.get('/about',(req,res)=>{
    res.send("<h2>Hello I am from you backend about</h2>")
})

app.listen(PORT,()=>{
    console.log(`Server is running on PORT ${PORT}`)
})