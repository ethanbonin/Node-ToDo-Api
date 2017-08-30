const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var message = 'I am user number 3';
var hash = SHA256(message).toString();

console.log(`Message: ${message}`);
console.log("Hash: " + hash);


var data = {
  id: 4
};


//This is salting the hash called somesecret
var token = {
  data: data,
  hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
};


token.data.id = 5;
token.hash = SHA256(JSON.stringify(token.data)).toString();


var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();
if (resultHash === token.hash){
  console.log("data was not changed");
} else {
  console.log("data was changed. Don't trust!");
};


//---------JSONWEBTOKEN---------//
var data = {
  id: 10
};

//The data that gets hashed, then the signature.
var token = jwt.sign(data, '123abc');
var decoded = jwt.verify(token, '123abc');
console.log(token);
console.log(decoded);


//---------BCRYPT-------------//
var password = 'abc123'

//10 of number of rounds,
//number of rounds is how complex the salt is going to be.
//Thus 120 rounds takes about---> GREATER THAN 5 MINUTES
bcrypt.genSalt(10, (err, salt) => {
  //(thing to hash, )
  bcrypt.hash(password, salt, (err, hash) => {
      console.log("hashed Password: ", hash);
  });
});


var hashed_value= '$2a$10$7lHWis5wp81DAOUfgZrPzOHZdLndpE.9GAfJNSKf44HH9t2OOQjLO'
bcrypt.compare(password, hashed_value, (err, response) => {
    console.log(response);
});
