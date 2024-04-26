const express =  require('express')
const {connectToDb, getDb} = require('./db')
const {ObjectId}= require('mongodb')
// const ui = require('./src/index')
const pasth = require('path')
const bcrypt = require('bcrypt')
// init app and middware

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.set('view engine', 'ejs')
app.use(express.static('public'))


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
app.get('/', (req, res) => {
    res.render('index')
})
app.get('/login', (req, res) => {
    res.render('login')
})


// db instance  



//routes
// user authentication
// registering a user
app.post('/login', async (req, res) => {
    const data = {
        email: req.body.email,
        password: req.body.password
    }
    const userData = await collection.insertOne(data)
    console.log(userData)
})

app.get('/Car_Parts', (req, res) => {

    const page = req.query.page || 0
    const perPage = 2

    db.collection('Car_Parts')
        .find()
        .sort({_id: 1})
        .skip(perPage * page)
        .limit(perPage)
        .toArray()  // Convert the cursor to an array
        .then(Car_Parts => {
            res.status(200).json(Car_Parts);
        })
        .catch(() => {
            res.status(500).json({mssg: "Could not fetch the documents"});
        });
});
//Fetching a single document
app.get('/Car_Parts/:id', (req, res) => {
    db.collection('Car_Parts')
        .findOne({ _id:new ObjectId(req.params.id) }) // Remove the 'new' keyword
        .then(doc => {
            if (doc) {
                res.status(200).json(doc);  
            } else {
                res.status(404).json({ message: "Document not found" });
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: "Could not fetch the document" });
        });
});
//making a post requst
app.post('/Car_Parts', (req, res) => {
    const newCar_Parts = req.body
    db.collection('Car_Parts')
        .insertOne(newCar_Parts)
        .then(result => {
            res.status(201).json(result);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: "Could not create the document" });
        });
})
//delecting a request
app.delete('/Car_Parts/:id',(req, res) =>{
    if(ObjectId.isValid(req.params.id)){
        db.collection('Car_Parts')
        .deleteOne({ _id:new ObjectId(req.params.id) }) // Remove the 'new' keyword
        .then(result => {
            if (result) {
                res.status(200).json(result);  
            } else {
                res.status(404).json({ message: "Document not found" });
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: "Not a valid document id" });
        });
    }
})
//updating a request(patch)
app.patch('/Car_Parts/:id', (req, res) => {
    const update = req.body
    if(ObjectId.isValid(req.params.id)){
        db.collection('Car_Parts')
            .updateOne({ _id: new ObjectId(req.params.id) }, { $set: update })
            .then(result => {
                res.status(200).json(result);
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({ message: "Could not update the document" });
            });
    }else{
        res.status(500).json({ message: "Not a valid document id" });
    }        
});

app.get('/Body_Parts', (req, res) => {

    const page = req.query.page || 0
    const perPage = 2

    db.collection('Body_Parts')
        .find()
        .sort({_id: 1})
        .skip(perPage * page)
        .limit(perPage)
        .toArray()  // Convert the cursor to an array
        .then(Body_Parts => {
            res.status(200).json(Body_Parts);
        })
        .catch(() => {
            res.status(500).json({mssg: "Could not fetch the documents"});
        });
});
//making a post request
app.post('/Body_Parts', (req, res) => {
    const newBody_Parts = req.body
    db.collection('Body_Parts')
        .insertOne(newBody_Parts)
        .then(result => {
            res.status(201).json(result);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: "Could not create the document" });
        });
})
//fetching one document
app.get('/Body_Parts/:id', (req, res) => {
    db.collection('Body_Parts')
        .findOne({ _id:new ObjectId(req.params.id) }) // Remove the 'new' keyword
        .then(doc => {
            if (doc) {
                res.status(200).json(doc);  
            } else {
                res.status(404).json({ message: "Document not found" });
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: "Could not fetch the document" });
        });
});
//delecting a request
app.delete('/Body_Parts/:id',(req, res) =>{
    if(ObjectId.isValid(req.params.id)){
        db.collection('Body_Parts')
        .deleteOne({ _id:new ObjectId(req.params.id) }) // Remove the 'new' keyword
        .then(result => {
            if (result) {
                res.status(200).json(result);  
            } else {
                res.status(404).json({ message: "Document not found" });
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: "Not a valid document id" });
        });
    }
})
//updating a request(patch)
app.patch('/Body_Parts/:id', (req, res) => {
    const update = req.body
    if(ObjectId.isValid(req.params.id)){
        db.collection('Body_Parts')
           .updateOne({ _id: new ObjectId(req.params.id) }, { $set: update })
           .then(result => {
                res.status(200).json(result);
            })
           .catch(err => {
                console.error(err);
                res.status(500).json({ message: "Could not update the document" });
            });
    }else{
        res.status(500).json({ message: "Not a valid document id" });
    }        
});

app.get('/Motor_Parts', (req, res) => {

    const page = req.query.page || 0
    const perPage = 2

    db.collection('Motor_Parts')
        .find()
        .sort({_id: 1})
        .skip(perPage * page)
        .limit(perPage)
        .toArray()  // Convert the cursor to an array
        .then(Motor_Parts => {
            res.status(200).json(Motor_Parts);
        })
        .catch(() => {
            res.status(500).json({mssg: "Could not fetch the documents"});
        });
});
//fetching one document
app.get('/Motor_Parts/:id', (req, res) => {
    db.collection('Motor_Parts')
        .findOne({ _id:new ObjectId(req.params.id) }) // Remove the 'new' keyword
        .then(doc => {
            if (doc) {
                res.status(200).json(doc);  
            } else {
                res.status(404).json({ message: "Document not found" });
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: "Could not fetch the document" });
        });
});
app.post('/Motor_Parts', (req, res) => {
    const newMotor_Parts = req.body
    db.collection('Car_Parts')
        .insertOne(newMotor_Parts)
        .then(result => {
            res.status(201).json(result);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: "Could not create the document" });
        });
})
//delecting a request
app.delete('/Motor_Parts/:id',(req, res) =>{
    if(ObjectId.isValid(req.params.id)){
        db.collection('Motor_Parts')
        .deleteOne({ _id:new ObjectId(req.params.id) }) // Remove the 'new' keyword
        .then(result => {
            if (result) {
                res.status(200).json(result);  
            } else {
                res.status(404).json({ message: "Document not found" });
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: "Not a valid document id" });
        });
    }
})
//updating a request(patch)
app.patch('/Motor_Parts/:id', (req, res) => {
    const update = req.body
    if(ObjectId.isValid(req.params.id)){
        db.collection('Motor_Parts')
           .updateOne({ _id: new ObjectId(req.params.id) }, { $set: update })
           .then(result => {
                res.status(200).json(result);
            })
           .catch(err => {
                console.error(err);
                res.status(500).json({ message: "Could not update the document" });
            });
    }else{
        res.status(500).json({ message: "Not a valid document id" });
    }        
});

app.get('/Accessories', (req, res) => {

    const page = req.query.page || 0
    const perPage = 2

    db.collection('Accessories')
        .find()
        .sort({_id: 1})
        .skip(perPage * page)
        .limit(perPage)
        .toArray()  // Convert the cursor to an array
        .then(Accessories => {
            res.status(200).json(Accessories);
        })
        .catch(() => {
            res.status(500).json({mssg: "Could not fetch the documents"});
        });
});
//Fetching a single document
app.get('/Accessories/:id', (req, res) => {
    db.collection('Accessories')
        .findOne({ _id:new ObjectId(req.params.id) }) // Remove the 'new' keyword
        .then(doc => {
            if (doc) {
                res.status(200).json(doc);  
            } else {
                res.status(404).json({ message: "Document not found" });
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: "Could not fetch the document" });
        });
});
app.post('/Accessories', (req, res) => {
    const newAccessories = req.body
    db.collection('Accessories')
        .insertOne(newAccessories)
        .then(result => {
            res.status(201).json(result);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: "Could not create the document" });
        });
})
//delecting a request
app.delete('/Accessories/:id',(req, res) =>{
    if(ObjectId.isValid(req.params.id)){
        db.collection('Accessories')
        .deleteOne({ _id:new ObjectId(req.params.id) }) // Remove the 'new' keyword
        .then(result => {
            if (result) {
                res.status(200).json(result);  
            } else {
                res.status(404).json({ message: "Document not found" });
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: "Not a valid document id" });
        });
    }
})
//updating a request(patch)
app.patch('/Accessories/:id', (req, res) => {
    const update = req.body
    if(ObjectId.isValid(req.params.id)){
        db.collection('Accessories')
           .updateOne({ _id: new ObjectId(req.params.id) }, { $set: update })
           .then(result => {
                res.status(200).json(result);
            })
           .catch(err => {
                console.error(err);
                res.status(500).json({ message: "Could not update the document" });
            });
    }else{
        res.status(500).json({ message: "Not a valid document id" });
    }        
});

app.get('/Exhaust_Parts', (req, res) => {

    const page = req.query.page || 0
    const perPage = 2

    db.collection('Exhaust_Parts')
        .find()
        .sort({_id: 1})
        .skip(perPage * page)
        .limit(perPage)
        .toArray()  // Convert the cursor to an array
        .then(Exhaust_Parts => {
            res.status(200).json(Exhaust_Parts);
        })
        .catch(() => {
            res.status(500).json({mssg: "Could not fetch the documents"});
        });
});
app.get('/Exhaust_Parts/:id', (req, res) => {
    db.collection('Exhaust_Parts')
        .findOne({ _id:new ObjectId(req.params.id) }) // Remove the 'new' keyword
        .then(doc => {
            if (doc) {
                res.status(200).json(doc);  
            } else {
                res.status(404).json({ message: "Document not found" });
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: "Could not fetch the document" });
        });
});
app.post('/Exhaust_Parts', (req, res) => {
    const newExhaust_Parts = req.body
    db.collection('Exhaust_Parts')
        .insertOne(newExhaust_Parts)
        .then(result => {
            res.status(201).json(result);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: "Could not create the document" });
        });
})
//delecting a request
app.delete('/Exhaust_Parts/:id',(req, res) =>{
    if(ObjectId.isValid(req.params.id)){
        db.collection('Exhaust_Parts')
        .deleteOne({ _id:new ObjectId(req.params.id) }) // Remove the 'new' keyword
        .then(result => {
            if (result) {
                res.status(200).json(result);  
            } else {
                res.status(404).json({ message: "Document not found" });
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: "Not a valid document id" });
        });
    }
})
//updating a request(patch)
app.patch('/Exhaust_Parts/:id', (req, res) => {
    const update = req.body
    if(ObjectId.isValid(req.params.id)){
        db.collection('Exhaust_Parts')
          .updateOne({ _id: new ObjectId(req.params.id) }, { $set: update })
          .then(result => {
                res.status(200).json(result);
            })
          .catch(err => {
                console.error(err);
                res.status(500).json({ message: "Could not update the document" });
            });
    }else{
        res.status(500).json({ message: "Not a valid document id" });
    }        
});

app.get('/Suspension_Parts', (req, res) => {

    const page = req.query.page || 0
    const perPage = 2

    db.collection('Suspension_Parts')
        .find()
        .sort({_id: 1})
        .skip(perPage * page)
        .limit(perPage)
        .toArray()  // Convert the cursor to an array
        .then(Suspension_Parts => {
            res.status(200).json(Suspension_Parts);
        })
        .catch(() => {
            res.status(500).json({mssg: "Could not fetch the documents"});
        });
});
app.get('/Suspension_Parts/:id', (req, res) => {
    db.collection('Suspension_Parts')
        .findOne({ _id:new ObjectId(req.params.id) }) // Remove the 'new' keyword
        .then(doc => {
            if (doc) {
                res.status(200).json(doc);  
            } else {
                res.status(404).json({ message: "Document not found" });
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: "Could not fetch the document" });
        });
});
app.post('/Suspension_Parts', (req, res) => {
    const newSuspension_Parts = req.body
    db.collection('Suspension_Parts')
        .insertOne(newSuspension_Parts)
        .then(result => {
            res.status(201).json(result);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: "Could not create the document" });
        });
})
//delecting a request
app.delete('/Suspension_Parts/:id',(req, res) =>{
    if(ObjectId.isValid(req.params.id)){
        db.collection('Suspension_Parts')
        .deleteOne({ _id:new ObjectId(req.params.id) }) // Remove the 'new' keyword
        .then(result => {
            if (result) {
                res.status(200).json(result);  
            } else {
                res.status(404).json({ message: "Document not found" });
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: "Not a valid document id" });
        });
    }
})
//updating a request(patch)
app.patch('/Suspension_Parts/:id', (req, res) => {
    const update = req.body
    if(ObjectId.isValid(req.params.id)){
        db.collection('Suspension_Parts')
         .updateOne({ _id: new ObjectId(req.params.id) }, { $set: update })
         .then(result => {
                res.status(200).json(result);
            })
         .catch(err => {
                console.error(err);
                res.status(500).json({ message: "Could not update the document" });
            });
    }else{
        res.status(500).json({ message: "Not a valid document id" });
    }        
});

