const express =  require('express');
const {connectToDb, getDb} = require('./db');

// db connection
let db

connectToDb((err) => {
    if(err) {
        console.log(err);
    } else {
        app.listen(3000,() => {
            console.log('listening on port 3000');
        });
        db = getDb();
    }

});


// db instance  

// init app and middware

const app = express();



//routes
app.get('/Car_Parts', (req, res) => {
    let Car_Parts = []

    db.collection('Car_Parts')
        .find()
        .forEach(car => Car_Parts.push(car))
        .then(() =>{
            res.status(200).json(Car_Parts);
        })
        .catch((err) => {
             res.status(500).json({mssg:"Could not fetch the documents"});
         })

    res.json({mssg: 'welcome to the Car Parts Inventory'});
});