// Request will have the information,whatever that is,comming form our frontend.
// Response : whatever you want to send to your frontend will handle by response. 
const User = require('../models/user')


exports.create = async (req,res)=>{
    const {name,email,password} = req.body;

    // check email already exist or not
    const oldUser = await User.findOne({email});

    // 401 status code unauthorized 
    if(oldUser) {return res.status(401).json({error : "This email is already in use!"})}

    // create new user inside our database 
    const newUser = new User({name,email,password})
     
    // save inside our database which async task
    await newUser.save()
    
    // var transport = nodemailer.createTransport({
    //     host: "sandbox.smtp.mailtrap.io",
    //     port: 2525,
    //     auth: {
    //       user: "7ac9c9a456c06e",
    //       pass: "6886953acb65d1"
    //     }
    //   });
    
    // 201 status code used for creating
    res.status(201).json({user:newUser})
   
}

