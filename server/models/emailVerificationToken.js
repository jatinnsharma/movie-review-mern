const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const emailVerificationTokenSchema = mongoose.schema({
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    token:{
        type:String,
        required:true,
    },
    createAt:{
        type:Date,
        expires:3600,
        default:Date.now()
    },
})
// arrow function don't have this keyword that we are using normal function
emailVerificationTokenSchema.pre('save',async function(next){
    if(this.isModified('token')){
        this.token = await bcrypt.hash(this.token,10)
    }
    next();
    })


module.exports = mongoose.model(
    "EmailVerificationToken",
    emailVerificationTokenSchema
)

// verificationToken:{
    // owner : _id,
    // token:otp (needs to be in hashed format),
    // expiryDate: 1 hr 
// }