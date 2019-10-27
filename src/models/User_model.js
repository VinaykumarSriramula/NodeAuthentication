const mongoose = require("mongoose");
const validator = require('validator');
const bcrypt = require("bcrypt")
const userScheme = new mongoose.Schema({
    name : {
        type: String,
        required : true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true
    },
    age: {
        type: Number,
        default: 0,
        validate(value){
            if(value<0){
                throw new Error('Age cannot be negative')
            }
        }
    }

})

userScheme.statics.findByCredentials = async (email, password) => {
    console.log("in db")
    const user = await User.findOne({email});
    if(!user){
        throw new Error('No user found with email')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
        throw new Error('Unable to login')
    }
    return user;
}

userScheme.pre('save', async function (next){
    const user = this
    if(user.isModified('password')){
        user.password= await bcrypt.hash(user.password, 8)
    }
    next()
})

const User = mongoose.model('Users', userScheme)

module.exports = User;
// const me = new User({
//     "name" : "vinay"
// })
// me.save().then( ( ) => {
//     console.log("saved user succussefully");
// })