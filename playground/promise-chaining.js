const Task = require('../src/models/task')
require('../src/db/mongoose')

// Task.findByIdAndDelete('6271694c2f0c6e571a84492b')
// .then((tasks) => {
//     console.log(tasks)
//     const count = Task.countDocuments({completed:false})
//     return count
// })
// .then((count)=>{
//     console.log(count)
// })
// .catch((err)=>{
//     console.log("ERROR")
//     console.log(err)
// })

const findAndUpdate = async (id) =>{
    const task = await Task.findByIdAndDelete(id)
    console.log(task)
    const count = await Task.countDocuments({completed:false})
    return count
}

findAndUpdate('62713adbc764faf9b000ac82')
.then((count)=>{console.log(count)})
.catch((err)=>{console.log(err)})