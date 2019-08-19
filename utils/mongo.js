const mongoose = require('mongoose');
require('dotenv').config()
const logger = require('../utils/logger');
function connectToMongoDb(){
    if(process.env.length < 3){
        logger.info('Please give a password as an argument');
        process.exit(1);
    }  

    mongoose.connect(process.env.MONGO_DB_URI,{useNewUrlParser:true})
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


