const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;

const URI = 'mongodb://127.0.0.1:27017';
mongoClient.connect(URI, {useNewUrlParser: true} ,(error,client)=>{
    if(error){
        console.log("The connection was failed.\n",error);
    }

    const db =client.db('trailDatabase');
    // db.collection('tasks').insertMany([
    //     {
    //         description:"Complete Section 10",
    //         completed: false
    //     },{
    //         description:"Buy ORS",
    //         completed: true
    //     },{
    //         description:"CCC training on Eid",
    //         completed: false
    //     }
    // ])
    db.collection('tasks').find({completed:false}).count()
    .then((result) => {
        console.log(result)
        console.log('result')
    })
    .catch((err) => {
        console.log(err)
        console.log('error')
    })
});