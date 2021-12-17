import express from 'express'
import auth from '../middleware/auth.js'
import {addNewUser , getAllUsers ,getUserByName, updateUser,getUserById,deleteUser,registerUser,loginUser} from '../controllers/userController.js'

const userRouter = new express.Router()


// dans ce fichier on definit les methodes CRUD
// POST ,GET , PUT , DELETE
userRouter.post('/users',addNewUser)
// list all users
userRouter.get('/userList',auth,getAllUsers)
//list users with a name
userRouter.get('/user',getUserByName)
userRouter.get('/user/:id',getUserById)
//update user
userRouter.put('/updateUser',updateUser)
//delete user
userRouter.delete('/delete/:id',deleteUser)
//register user
userRouter.post('/register',registerUser)
//login user
userRouter.post('/user/login',loginUser)
//logout user
//userRouter.post('/user/logout',logoutUser)
//logout All users
//userRouter.post('/user/logoutAll',logoutAllUsers)

export default userRouter