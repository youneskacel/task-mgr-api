import App from './App.js'

const port = process.env.APP_PORT;

App.listen(port , ()=> {
    
        console.log(`Server is on port ${port}`)
    
} )