const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/review_app',{
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    family: 4,
}).then(()=>{
    console.log('db is connected!')
}).catch((error)=>{
    console.log(`Database connection failed ${error}`)
})