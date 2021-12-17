import mongoose from 'mongoose'
import validator from 'validator'
import isEmail from 'validator/lib/isEmail.js';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    age : {
        type : Number,
        default : 0,
        validate(value) {  //pour valider un champ et donner un message d'erreur au cas de non validation
            if (value<0){
                throw new Error("age cannot be negativ")
            }
        }
    },
    email : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true,   // "  hello   " => "hello"
        validate(value) {
            if(!isEmail(value)){
                throw new Error("please insert valid email")
            }
        }
    },
    password : {
        type : String,
        required : true,
        minLenght : 7,
        validate(value){
            if(value.toLowerCase().includes("password")){
                throw new Error("password must not contain the word : Password")
            }
        }
    },
    tokens: [{
        token:{
            type : String,
            required : true
        }
    }]
    
},
    {timestamps : true}
)

userSchema.pre('save',async function (next)  {
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password , 8)
    }
    next()
})
//find a user from email and check password
userSchema.statics.findByCredentials = async (email,password)=> {
    const user = await User.findOne({email})
    if(!user){
        throw new Error('Unable to login')
    }
    //check password
    const isMatch = await bcrypt.compare(password , user.password)
    if(!isMatch) {
        throw new Error ('Password wrong')
    }
    return user
}
//function to generate token 
// userSchema.methods.generateAuthToken = async () => {
//     const user = this
//     //create a token using id of user and a key secret : 'mysecret
//     const token = jwt.sign({_id : user._id.toString()},'mysecret')

//     user.tokens = user.tokens.concat({token})
//     await user.save()

//     return token
// }

//function to generate a token
userSchema.methods.generateAuthToken = async function () {
    const user = this
    //create a token using id of user and a key secret: "mysecret"
    const token = jwt.sign({_id: user._id.toString()}, "mysecret")

    user.tokens = user.tokens.concat({token})
    await user.save()

    return token
}

const User = mongoose.model("User",userSchema)

export default User