const express =  require('express')
const {connectToDb, getDb} = require('./db')
const app = express()


// db connection
let db

connectToDb((err) => {
    if(!err) {
        app.listen(3000,() => {
            console.log('listening on port 3000')
        })
        db = getDb()
    }

})


// db instance  

// init app and middware


//routes
app.get('/Car_Parts', (req, res) => {
    db.collection('Car_Parts')
        .find()
        .sort({_id: 1})
        .toArray()  // Convert the cursor to an array
        .then(Car_Parts => {
            res.status(200).json(Car_Parts);
        })
        .catch(() => {
            res.status(500).json({mssg: "Could not fetch the documents"});
        });
});
