import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import httpStatus from 'http-status';

import indexRoutes from './index.route';
import Constants from '../config/constants';
import APIError from '../utils/APIError';
import expressValidation from 'express-validation';
import expressWinston from 'express-winston';
import logger from '../utils/logger';

const app = express();

// Helmet helps you secure your Express apps by setting various HTTP headers
// https://github.com/helmetjs/helmet
app.use(helmet());
app.use(helmet.frameguard());
app.use(helmet.xssFilter());
app.use(helmet.noSniff());
app.use(helmet.ieNoOpen());
app.disable('x-powered-by');

// Enable CORS with various options
// https://github.com/expressjs/cors
app.use(cors());
app.use(function(req, res, next) {
            // Website you wish to allow to connect
            res.set('Access-Control-Allow-Origin', '*');
            // Request methods you wish to allow
            res.set('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
            // Request headers you wish to allow
            res.set('Access-Control-Allow-Headers', 'Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token');

            // Pass to next layer of middleware
            next();
        });


// Request logger
// https://github.com/expressjs/morgan
if (!Constants.envs.test) {
  app.use(morgan('dev'));
}

// Parse incoming request bodies
// https://github.com/expressjs/body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());


// Lets you use HTTP verbs such as PUT or DELETE
// https://github.com/expressjs/method-override
app.use(methodOverride());

// Mount public routes
//app.use('/public', express.static(`${__dirname}/public`));



// Mount API routes
app.use(Constants.apiPrefix, indexRoutes);

// if error is not an instanceOf APIError, convert it.
app.use((err, req, res, next) => {
  if (err instanceof expressValidation.ValidationError) {
    // validation error contains errors which is an array of error each containing message[]
    const unifiedErrorMessage = err.errors.map(error => error.messages.join('. ')).join(' and ');
    const error = new APIError(unifiedErrorMessage, err.status, true);
    return next(error);
  } else if (!(err instanceof APIError)) {
    const apiError = new APIError(err.message, err.status, err.isPublic);
    return next(apiError);
  }
  return next(err);
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new APIError('API not found', httpStatus.NOT_FOUND);
  return next(err);
});


export default app;
