/*
 NODE_ENV can have one of three values:
 'production', 'development', 'test'.
 heroku app will always run the app with the value set 'production'.
 In default NODE_ENV could be not defined.
 */
const env = process.env.NODE_ENV || 'development';

// use different mongodb database according to the value of NODE_ENV
if(env === 'development') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
} else if(env === 'test') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
}
