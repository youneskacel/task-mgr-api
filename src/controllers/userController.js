import { elementAcceptingRef } from '@mui/utils'
import User from '../models/user.js'



const addNewUser = async (req,res) => {
    console.log('request :',req.body)
    const user = new User(req.body)
    try{
       await user.save()
        res.status(200).json({
            message : "User Created",
            data : user
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            message : "Internal server error",
            data : user
        })
    }
    
}

const getAllUsers = async(req,res) => {
    try{
        const users = await User.find()
        res.status(200).json({
            message : "All users",
            data : users
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            message : "Internal server error",
            
        })}

}

const getUserByName = async (req,res) => {
    try{
        const users = await User.find(req.body)
        res.status(200).json({
            message : "User : ",
            data : users
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            message : "Internal server error",
            
        })}
}

const getUserById = async (req,res) => {
    
    
    try {
        const user = await User.findById(req.params.id)
        res.status(200).json({
            message : "User : ",
            data : user
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            message : "User not found",
            
        })}
    }


const updateUser = async (req,res) => {
    try{
        
        const user = await User.findByIdAndUpdate(req.body.id,req.body)
        
        res.status(200).json({
            message : "User Saved ",
            data : user
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            message : "Internal server error",
            
        })}
}


const deleteUser = async (req,res) => {
    console.log(req.params)
    try{
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json({
            message : "user Deleted"
        })
    }catch(err){
        res.status(500).json({
            message : "Internal server error",
            
        })
    }
}

const registerUser = async (req,res) => {
    try{
        //pour verifier que tout les champs sont saisis
        const {name,email,password} = req.body
        if(!(name&&email&&password)){
            res.status(400).json({
                message : "all inputs are required"
            })
        }
        //pour verifier si l'utilisateur est deja enregistré
        const oldUser = await User.findOne({email})
        if(oldUser){
            res.status(409).json({
                message : "user already exists please login"
            })
        }
        //create user
        const user = new User(req.body)

        //add token 
        const token = await user.generateAuthToken()
        console.log("token :",token)
        res.status(201).json({
            message: "User created successfuly",
            data : {
                user,token
            }

        })

    }catch(err){
        console.log(err)
        res.status(500).json({
            message : "Internal server error",
            error : err
        })
    }
}

const loginUser = async (req,res) => {
    try{

        const {email , password} = req.body
        const user = await User.findByCredentials(email , password)
        if(!user){
            res.status(404).json({
            message : "User doesn't exist"
        })}
        
        const token = await user.generateAuthToken()
        res.status(200).json({
            message : 'logged succesfully',
            data : { user , token}
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            message : "Internal server error",
            error : err
        })
    }
}


// const logoutUser = async (req,res) => {
//     try{
//         req.user.tokens = req.user.tokens.filter(el  => {
//             return el.token != req.token
//         })
//         await req.user.save() 
//         res.status(200).json({
//             message : "user logout successfully",
//             data : req.user
//         })
//     }catch(err){
//         res.status(500).json({
//             message : "Internal server error",
//             error : err
//         })
//     }
//}

const logoutAllUsers = async ( req, res) => {

}



export  {
    addNewUser,
    getAllUsers,
    getUserByName,
    updateUser,
    getUserById,
    deleteUser,
    registerUser,
    loginUser,
    //logoutUser,
    logoutAllUsers
}