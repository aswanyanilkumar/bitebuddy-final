//config/dbConnection.js
const mongoose = require('mongoose')


const connectDB = () => {
    try{
        mongoose.connect("mongodb+srv://aswany10621:eiHqBXAymLRlYfUs@cluster0.azaniza.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
        console.log("DB connection successfull")
    }catch(error) {
        console.log(error);
    }
}


module.exports = connectDB
