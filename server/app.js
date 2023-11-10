const express = require("express")
require('./db'); 
const app = express()
const userRouter = require('./routes/user')
const PORT = 8000

// MVC - Modal View Controller
// This method will convert everythig comming from our frontend to this JSON for me.
app.use(express.json())

//user model
app.use("/api/user",userRouter)

app.get('/about',(req,res)=>{
    res.send("<h2>Hello I am from you backend about</h2>")
})

app.listen(PORT,()=>{
    console.log(`Server is running on PORT ${PORT}`)
})