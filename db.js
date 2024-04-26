const {MongoClient} = require('mongodb')
const mongoose = require('mongoose')

let dbConnection 

module.exports = {

    connectToDb: (cb)=>{
        MongoClient.connect('mongodb://localhost:27017/VehiclePart_MS')
            .then((client)=>{
                dbConnection = client.db()
                console.log("connection established on " + dbConnection)
                return cb()
            })
            .catch((err)=>{
                 console.log(err)
                 return cb(err)
             })
        // return new Promise((resolve, reject) => {
        //     MongoClient.connect('mongodb://localhost:27017/VehiclePart_MS', (err, client) => {
        //         if (err) reject(err);
        //         resolve(client);
        //     });

        // });
        const loginSchema = new mongoose.Schema({
            email:{
                type: String,
                required: true
            },
            password:{
                type: String,
                required: true
            }
        })
        const collection =new mongoose.model('User',loginSchema);

        

    },
    
    getDb: ()=> dbConnection
    
}

// collection part

// module.exports = collection;
