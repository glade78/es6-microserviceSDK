import mongoose from 'mongoose';
import Constants from '../config/constants';
import logger from '../utils/logger';

// Use native promises
mongoose.Promise = global.Promise;

// create the database connection
mongoose.connect(Constants.mongodb.dbURI, Constants.mongodb.dbOptions);

// when successfully connected
mongoose.connection.on('connected', () => {
    logger.info('Mongoose connected to ' + Constants.mongodb.dbURI);
});

// if the connection throws an error
mongoose.connection.on('error', (err) => {
    logger.error('Mongoose connection error: ' + err);
});

// when the connection is disconnected
mongoose.connection.on('disconnected', () => {
    logger.info('Mongoose disconnected');
});

// when the connection is open
mongoose.connection.once('open', () =>  {
    logger.info('Mongoose Coonection Open');
});

// if the Node process ends, close the Mongoose connection
process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        logger.info('Mongoose disconnected through app termination');
        process.exit(0);
    });
});

