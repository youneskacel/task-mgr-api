import jwt from 'jsonwebtoken'
import User from '../models/user.js'


const auth = async (req,res,next) => {
    
    try {
        //get the token from request header
        const token = req.header('token')
        console.log(token)
        //decode token using the same key we used before "mysecret" 
        const decoded = jwt.verify(token , "mysecret")
        console.log(decoded)
        // { _id: '61ab5506a7a00c3aaf6cafb0', iat: 1639130069 }

        //find user is db by decoded_id and token 
        const user = await User.findOne({_id:decoded._id , 'tokens.token' : token})
        if(!user ){
            throw new Error( )
        }

        //save token and user in req

        req.token = token
        req.user = user

        next()
    }catch(err) {
        console.log(`error : ${err}`)
        res.status(401).json({
            message : 'Unauthorized : please authentificate',
            data : {}                       
        })
    }
} 


export default auth