const mongoose = require('mongoose');
require('dotenv').config()
const logger = require('../utils/logger');

let MONGO_DB_URI = process.env.MONGO_DB_URI;
function connectToMongoDb(){
    if(process.env.length < 3){
        logger.info('Please give a password as an argument');
        process.exit(1);
    }  
    
    if (process.env.NODE_ENV === 'test') {
        MONGO_DB_URI = process.env.TEST_MONGO_DB_URI
    }
    console.log(MONGO_DB_URI)
    mongoose.connect(MONGO_DB_URI,{useNewUrlParser:true})
    .then(() => {
        logger.info('connected to MongoDB')
      })
      .catch((error) => {
        logger.error('error connection to MongoDB:', error.message)
      })
}


module.exports = {
    connectToMongo:connectToMongoDb
}


