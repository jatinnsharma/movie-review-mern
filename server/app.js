const express = require("express")
const app = express()

const PORT = 8000

app.get('/',(req,res)=>{
    res.send("<h2>Hello I am from you backend server</h2>")
})
app.get('/about',(req,res)=>{
    res.send("<h2>Hello I am from you backend about</h2>")
})


app.listen(PORT,()=>{
    console.log(`Server is running on PORT ${PORT}`)
})