const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/mongooseTrail')
.then(()=>{
    console.log("Connecting to MongoDB")
});




// const user = new User({
//     name:"Sanju",
//     email:"abxy@z.in",
//     password:"dckkjc"
// })

// user.save()
// .then(()=> console.log("User saved"))
// .catch((err)=>console.log("ERROR!\n", err))





// const newTask = new Task({
//     description:"Learn Mongo",
//     completed: true
// })

// newTask.save()
// .then(() => console.log("New task added!\n",newTask))
// .catch(err => console.log("ERROR!\n",err))