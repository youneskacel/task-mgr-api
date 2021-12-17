import express from 'express'
import { addNewTask, getAllTasks , completeTask, getCompletedTask } from '../controllers/taskController.js'

const taskRouter = new express.Router()

taskRouter.get('/tasks',getAllTasks)

taskRouter.post('/newTask',addNewTask)

taskRouter.put('/complete/:id', completeTask)

//get completed tasks
taskRouter.get('/tasksComp',getCompletedTask)

export default taskRouter