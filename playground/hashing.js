const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

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
