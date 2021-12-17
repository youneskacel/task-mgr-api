import Task from '../models/task.js'


const addNewTask = async (req,res) => {
    console.log('request :',req.body)
    const task = new Task(req.body)
    try{
       await task.save()
        res.status(200).json({
            message : "Task Created",
            data : task
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            message : "Internal server error",
            data : task
        })
    }
    
}


const completeTask = async (req,res) => {
    
    try{
        await Task.findByIdAndUpdate(req.params.id,{completed : true})
        res.status(200).json({
            message : "Completed succesful"
        })
    }catch ( err){
        console.log(err)
    }
}


const getAllTasks = async (req,res) =>{
    try{
        const tasks = await Task.find()
        res.status(200).json({
            message : "Tasks found :",
            data : tasks
        })
    }catch(err) {
        res.status(500).json({
            message : "no Task Found"
        })
    }
}

const getCompletedTask = async (req,res) => {
    
    try{
        const tasks = await Task.find({completed : req.query.completed}).populate('owner',"name email")
        res.status(200).json({
            message : "tasks found :",
            data : tasks
        })
    }catch(err) {

    }
}


export {
    getAllTasks,
    addNewTask,
    completeTask,
    getCompletedTask
}