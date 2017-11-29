import redis from 'redis';
import Constants from '../config/constants';

let redisClient = null;

if(config.redis.isAvailable) {
	redisClient = redis.createClient(Constants.redis.port, Constants.redis.host);

	redisClient.auth(Constants.redis.auth);

	redisClient.on('connect', ()=>{
        logger.info('Redis connected to ' + Constants.redis.host + ':' + Constants.redis.port);
    });

    redisClient.on('error', (err) => {
        logger.error('Redis error: ' + err);
    });
}