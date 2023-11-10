const express = require("express")
const app = express()
const userRouter = require('./routes/user')
const PORT = 8000

// MVC - Modal View Controller

app.use(userRouter)

app.get('/about',(req,res)=>{
    res.send("<h2>Hello I am from you backend about</h2>")
})


app.listen(PORT,()=>{
    console.log(`Server is running on PORT ${PORT}`)
})