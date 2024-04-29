const mongoose = require('mongoose');

// let uri = 'mongodb+srv://phavour:phavour123@cluster0.jhkqkgk.mongodb.net/VehiclePart_MS?retryWrites=true&w=majority&appName=Cluster0'
let uri = 'mongodb://localhost:27017/VehiclePart_MS'

const connect = mongoose.connect(uri)

connect.then(() => {
    console.log('Connected successfully')
}).catch(() => {
    console.log('Failed to connect')
})

const SignupSchema = new mongoose.Schema({
    Username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    confirmPassword:{
        type: String,
        required: true
    }
})

const collection =new mongoose.model("users",SignupSchema);
module.exports = collection;

