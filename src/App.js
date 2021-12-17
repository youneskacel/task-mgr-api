import express from 'express'
import './db/mongoose.js'
import User from './models/user.js'
import userRouter from './routes/userRoutes.js'
import taskRouter from './routes/taskRoutes.js'
const App = express()

App.use(express.json())
App.use(userRouter)
App.use(taskRouter)

export default App