const express =  require('express');

// init app and middware

const app = express();

app.listen(3000,() => {
    console.log('listening on port 3000');
});

//routes
app.get('/Car_Parts', (req, res) => {
    res.json({mssg: 'welcome to Car_Parts Inventory'});
});