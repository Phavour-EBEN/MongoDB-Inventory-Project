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
    res.json({mssg: 'welcome to Car_Parts Inventory'});
});