const {MongoClient} = require('mongodb');

let dbConnection 

module.exports = {

    connectToDb: (cb)=>{
        MongoClient.connect('mongodb://localhost:27017/VehiclePart_MS')
            .then((client)=>{
                dbConnection = client.db();
                return cb()
            })
            .catch((err)=>{
                 console.log(err);
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