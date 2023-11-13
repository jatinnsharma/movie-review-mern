const nodemailer = require('nodemailer')

// generate 6 digit otp 
exports.generateOTP=(otp_length = 6)=>{
     let OTP = "";
     for (let i = 1; i <= otp_length; i++) {
         const randomVal = Math.round(Math.random() * 9)
         OTP += randomVal;
     }
     return OTP;
}

exports.generateMailTransporter = () => 
nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "596002148130f3",
        pass: "cebd3db9c31d88"
    }
});