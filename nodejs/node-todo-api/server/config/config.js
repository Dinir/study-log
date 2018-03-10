/*
 NODE_ENV can have one of three values:
 'production', 'development', 'test'.
 heroku app will always run the app with the value set 'production'.
 In default NODE_ENV could be not defined.
 */
const env = process.env.NODE_ENV || 'development';

if(env === 'development' || env === 'test') {
  const config = require('./config.json');
  const envConfig = config[env];

  Object.keys(envConfig).forEach(key => {
    process.env[key] = envConfig[key];
  });
}

// the data is moved to a json file that's not a part of the repository
// when making an actual app, this should've been done first.
