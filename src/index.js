const express = require('express');
require('./db/mongoose')

const userRouter = require('./routers/userRoutes')
const taskRouter = require('./routers/taskRoutes')

const app = express();
const port = process.env.PORT || 3000;

// app.use((req,res,next)=>{
//     res.status(503).send("The site is under maintenance")
// })

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port,()=>{
    console.log("Server running at port: ",port)
})