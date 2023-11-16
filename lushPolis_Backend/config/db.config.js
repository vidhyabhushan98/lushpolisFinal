//env variable
require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
    try{
        //use env variable for mongo uri here
        const conn = await mongoose.connect(process.env.MONGO_URI);
        //const conn = await mongoose.connect("mongodb+srv://tejab2610:XbeNsZRCeOnE5iZu@cluster0.hijpesg.mongodb.net/");      
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }catch(err){
        console.log("Error in connecting to MongoDB",err);
        process.exit(1);
    }
};
module.exports = connectDB;