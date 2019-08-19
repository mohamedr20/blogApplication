const mongoose = require('mongoose');
require('dotenv').config()

function connectToMongoDb(){
    if(process.env.length < 3){
        console.log('Please give a password as an argument');
        process.exit(1);
    }  
    mongoose.connect(process.env.MONGO_DB_URI,{useNewUrlParser:true});
}


module.exports = {
    connectToMongo:connectToMongoDb
}


