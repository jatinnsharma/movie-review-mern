// Request will have the information,whatever that is,comming form our frontend.
// Response : whatever you want to send to your frontend will handle by response. 
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const EmailVerificationToken = require('../models/emailVerificationToken');
const { isValidObjectId } = require('mongoose');
const { generateOTP, generateMailTransporter } = require('../utils/mail');
const { sendError, generateRandomByte } = require('../utils/helper');
const PasswordResetToken = require("../models/passwordResetToken")



exports.create = async (req, res) => {
    const { name, email, password } = req.body;

    // check email already exist or not
    const oldUser = await User.findOne({ email });

    // 401 status code unauthorized 
    if (oldUser) { return sendError(res,"This email is already in use!") }

    // create new user inside our database 
    const newUser = new User({ name, email, password })

    // save inside our database which async task
    await newUser.save()

    // generate 6 digit otp 
    let OTP = generateOTP();

    // store otp inside our db 
    const newEmailVaificationToken = new EmailVerificationToken({
        owner: newUser._id,
        token: OTP,
    })

    await newEmailVaificationToken.save();


    // send that otp to our user 
    var transport = generateMailTransporter()

    transport.sendMail({
        from: "verfication@moviereviewapp.com",
        to: newUser.email,
        subject: 'Email Verification',
        html: `
        <p>Your verification OTP Number</p>
        <h1>${OTP}</h1>
        `
    })

    // 201 status code used for creating
    res.status(201).json({ message: 'Please verify your email. OTP has been send to your email account' })

}

// verifying email verification Token (Otp)
exports.verifyEmail = async (req, res) => {
    const { userId, OTP } = req.body;

    //check userid is valid
    if (!isValidObjectId(userId)) return res.json({ error: "Invalid user" })

    // found user 
    const user = await User.findById(userId)
    // check if user is not found 
    //404 for not found
    if (!user) return sendError(res,"user not found",404)

    // if verified user 
    if (user.isVerified) return sendError(res,"user is already verified!" ) 

    const token = await EmailVerificationToken.findOne({ owner: userId })

    if (!token) return sendError(res,"Token not found !" ) 

    const isMatch = await token.compareToken(OTP)
    if (!isMatch)  return sendError(res,"Please submit a valid OTP") 
   

    user.isVerified = true;
    await user.save();

    await EmailVerificationToken.findByIdAndDelete(token._id)

    var transport = generateMailTransporter()

    transport.sendMail({
        from: "verfication@moviereviewapp.com",
        to: user.email,
        subject: 'Welcome Email',
        html: `<h1>Welcome to our app and thanks for choosing us!!</h1>
    `,
    });
    res.json({message:'Your email is verified.'})
}

// Resend email after 1 hrs.
exports.resendEmailVerificationToken = async (req,res) =>{
    const {userId} = req.body;

    const user = await User.findById(userId)
    if(!user) return sendError(res,'user not found') 
    

    if(user.isVerified) return  sendError(res,'This email id is already verified!') 
    
    const alreadyHasToken = await EmailVerificationToken.findOne({owner:userId})
    if(alreadyHasToken) return sendError(res,'Only after one hour you can request for another token!') 
    
    // generate 6 digit otp 
    let OTP = generateOTP()

    // store otp inside our db 
    const newEmailVaificationToken = new EmailVerificationToken({
        owner: user._id,
        token: OTP,
    })

    await newEmailVaificationToken.save();


    // send that otp to our user 
    const transport = generateMailTransporter()

    transport.sendMail({
        from: "verfication@moviereviewapp.com",
        to: user.email,
        subject: 'Email Verification',
        html: `
        <p>Your verification OTP Number</p>
        <h1>${OTP}</h1>
        `
    })
    res.json({message:"New otp has been sent to your registered email account"})

}

exports.forgetPassword = async (req,res)=>{
    const {email} = req.body;

    if(!email) return sendError(res,'Email is missing!');

    const user = await User.findOne({email})
    if(!user) return sendError(res,'User not found',404);

    // check already reset password  token inside database.
   const alreadyHasToken =  await PasswordResetToken.findOne({owner:user._id})
   if(alreadyHasToken) return sendError(res,'Only after one hour you can request for another token') 

    const token = await generateRandomByte();
    const newPasswordResetToken = await PasswordResetToken({owner:user._id,token});
    await newPasswordResetToken.save();

    const resetPasswordUrl = `http://localhost:3000/reset-password?token=${token}$id=${user._id}`

    var transport = generateMailTransporter()

    transport.sendMail({
        from: "security@moviereviewapp.com",
        to: user.email,
        subject: 'Reset Password Link',
        html: `
        <p>Clich here to reset password</p>
        <a href='${resetPasswordUrl}'>Change Password</a>
        ` 
    })

    res.json({message:"Link sent to your email !!"})

}

exports.sendResetPasswordTokenStatus = (req,res)=>{
    res.json({valid:true});
}

exports.resetPassword = async (req,res)=>{
    const {newPassword,userId} = req.body;

    const user = await User.findById(userId)
    const matched = await user.comparePassword(newPassword)

    if(matched) return sendError(res,'The new password must be different from the old one!')

    user.password = newPassword;
    await user.save();

    await PasswordResetToken.findByIdAndDelete(req.resetToken._id);
      
    const transport = generateMailTransporter()

    transport.sendMail({
        from: "security@moviereviewapp.com",
        to: user.email,
        subject: 'Password Reset Successfully',
        html: `
        <h1>Password Reset Successfully</h1>
        <p>Now you can use new password.</p>
        `
    })
    res.json({message:"Password reset successfully , now you can use new password."})



}

exports.signIn = async (req,res)=>{
    const {email,password} = req.body;

    const user = await User.findOne({email})
    if(!user) return sendError(res,'Email/Password mismatch!')

    const matched = await user.comparePassword(password) 
    if(!matched) return sendError(res,'Email/Password mismatch!');

    const {_id,name} = user

    const jwtToken = jwt.sign( {user: {id:_id,name,email,token:jwtToken}},process.env.JWT_SECRET);
    res.json({user:{id: _id}})

    
}