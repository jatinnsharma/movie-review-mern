 const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
 const userSchema = mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true,
    },
    email:{
        type:String,
        trim:true,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    isVerified:{
        type:Boolean,
        required:true,
        default:false,
    }
 })

// whenever we are saving this file before we save this file
// we want to run this function.
// hash this password before we saved this record    
// hashing password is async task 
userSchema.pre('save',async function(next){
if(this.isModified('password')){
    this.password = await bcrypt.hash(this.password,10)
}
// next() will decide whether we want to move to the next function or not 
next();
})

userSchema.methods.comparePassword = async function (password) {
    const result =   await bcrypt.compare(password , this.password)
    return result;
}

module.exports = mongoose.model("User",userSchema)