//Only set on heroku--> Needs to be set LOCALLY
//Make sure you update the package.json
var env = process.env.NODE_ENV || 'development';

console.log('env ****', env);


if (env === 'development' || env === 'test') {

  //When loading a json file, javascript automatically parses it into an ObjectID
  var config = require('./config.json');
  var envConfig = config[env];

  console.log(Object.keys(envConfig).forEach((key) => {
    process.env[key] = envConfig[key];
  }));
}

// if (env === 'development') {
//   process.env.PORT = 3000;
//   process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
// } else if (env === 'test') {
//   process.env.PORT = 3000;
//   process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
// }
