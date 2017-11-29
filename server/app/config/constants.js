import path from 'path';

const config = {
	env: process.env.NODE_ENV || 'development',
  	get envs() {
    	return {
      		test: process.env.NODE_ENV === 'test',
      		development: process.env.NODE_ENV === 'development',
      		production: process.env.NODE_ENV === 'production',
    	};
  	},

  	version: process.env.VERSION || '1.0',
  	root: path.normalize(__dirname + '/../../..'),


  	server :{
    	host: '0.0.0.0',
   		port: process.env.NODE_PORT || process.env.PORT || 3000
	},

	apiPrefix: process.env.API_PREFIX || '/api/v1', // Could be /api/resource or /api/v2/resource
  	userRoles: ['guest', 'user', 'admin'],

   /**
   * Security configuation options regarding sessions, authentication and hashing
   */
  	security: {
    	sessionSecret: process.env.SESSION_SECRET || 'i-am-the-secret-key',
    	sessionExpiration: process.env.SESSION_EXPIRATION || 60 * 60 * 24 * 7, // 1 week
    	saltRounds: process.env.SALT_ROUNDS || 12,
  	},

	mongodb : {
    	dbURI: process.env.MONGODB_URI || process.env.MONGOLAB_URI || "mongodb://127.0.0.1:27017/ionic-photo-gallery",
    	dbOptions: {"user": "", "pass": ""}
	},

	redis : {
    	isAvailable: process.env.IS_REDIS_AVAILABLE || true,
    	host: process.env.REDIS_HOST || '127.0.0.1',
    	port: process.env.REDIS_PORT || 6379,
    	auth: process.env.REDIS_AUTH || '',
    	options: {}
	}

};

export default config;