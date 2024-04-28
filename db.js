const {MongoClient} = require('mongodb')

let dbConnection 
let uri = 'mongodb+srv://phavour:phavour123@cluster0.jhkqkgk.mongodb.net/VehiclePart_MS?retryWrites=true&w=majority&appName=Cluster0'
// let uri = 'mongodb://localhost:27017/VehiclePart_MS'

module.exports = {

    connectToDb: (cb)=>{
        MongoClient.connect(uri)
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
        
    },
    
    getDb: ()=> dbConnection
    
}

// collection part


