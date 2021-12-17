import mongoose from 'mongoose'
import 'dotenv/config'

//const MONGODB_URL = 'mongodb://localhost:27017/task-db'
const MONGODB_URL = `mongodb://${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`

const options = {
    useUnifiedTopology : true, 
    useNewUrlParser : true
}
 
mongoose.connect(MONGODB_URL,options).then(()=> console.log('db is on'))