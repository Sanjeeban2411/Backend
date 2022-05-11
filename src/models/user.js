const mongoose = require('mongoose');
const validator = require('validator');

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim:true
    },
    email:{
        type: String,
        required: true,
        unique:true,
        lowercase: true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email")
            }
        }
    },
    password:{
        type: String,
        required: true,
        trim:true,
        minLength: 6,
        validate(value){
            if(validator.contains(value,'password',{ignoreCase:true})){
                throw new Error('Password should not contain "password"')
            }
        }
    },
    age:{
        type: Number,
        default: 0,
        trim: true
    },
    tokens:[{
        token:{
            type:String,
            required: true
        }
    }]
})

userSchema.methods.generateAuthToken = async function(){
    const user = this
    // try {
    const token = jwt.sign({_id : user._id.toString()}, "secrectcode")
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
        // console.log('generateAuthToken')
        
    // } catch (error) {
    //     res.send("ERROR! in generateAuthToken",error)
    // }
}

userSchema.statics.findOneByCred = async (email,password)=>{
    const user = await User.findOne({email})
    if(!user){
        return("Could not log in")
        // throw new Error('Unable to login')
    }
    // else{
    const check = await bcrypt.compare(password, user.password)
        if(!check){
            return("Could not log in")
            // throw new Error('Unable to login')
        }
        
        return user
    // }
}

// userSchema.pre('save', async function(next){
//     this.password = await bcrypt.hash(this.password,8)
//     console.log(this.password)
//     next()
// })

userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User