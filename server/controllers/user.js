// Request will have the information,whatever that is,comming form our frontend.
// Response : whatever you want to send to your frontend will handle by response. 
const nodemailer = require('nodemailer')
const User = require('../models/user')
const EmailVerificationToken = require('../models/emailVerificationToken');
const { isValidObjectId } = require('mongoose');



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

    // generate 6 digit otp 
    let OTP = " ";
    for(let i = 0;i<=5;i++){
        const randomVal = Math.round(Math.random()*9)
        OPT+=randomVal;
    }
    // store otp inside our db 
    const newEmailVaificationToken = new EmailVerificationToken({owner:newUser._id,
        token:OTP,
    })

    await newEmailVaificationToken.save();

    // send that otp to our user 
    
    var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "7ac9c9a456c06e",
          pass: "6886953acb65d1"
        }
      });


      transport.sendMail({
        from:"verfication@moviereviewapp.com",
        to:newUser.email,
        subject:'Email Verification',
        html:`
        <p>Your verification OTP Number</p>
        <h1>${OTP}</h1>
        `
      })

    // 201 status code used for creating
    res.status(201).json({message:'Please verify your email. OTP has been send to your email account'})
   
}




exports.verifyEmail = async (req,res)=>{
    const {userId,OTP} = req.body;

    if(! isValidObjectId(userId)){
    return (
        res.json({error:"Invalid user"})
    )
}  
const user = await User.findById(userId)
if(!user){
    return (
        res.json({error:"user not found"})
    )
}

if(user.isVerified) return res.json({error : "user is already verified!"})

const token = await EmailVerificationToken.findOne({owner:userId})

if(!token) return res.json({error:"Token not found!"})

}