// Request will have the information,whatever that is,comming form our frontend.
// Response : whatever you want to send to your frontend will handle by response. 
const User = require('../models/user')


exports.create = async (req,res)=>{
    const {name,email,password} = req.body;

    // create new user inside our database 
    const newUser = new User({name,email,password})
     
    // save inside our database which async task
    await newUser.save() 

    res.json({user:newUser})
   
}

