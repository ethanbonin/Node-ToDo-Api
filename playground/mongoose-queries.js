const {ObjectID} = require('mongodb');

var {mongoose} = require('../server/db/mongoose');
var {Todo} = require('../server/db/models/todos');

var id = '59a334da4ca0212a4e291d77'


Todo.find({
  _id: id
}).then((todos) => {
  console.log("Todos", todos);
});

Todo.findOne({
  _id: id
}).then((todo) => {
  console.log("Todo", todo);
});

//Same thing as above
Todo.findById(id).then((todo) => {
  if (!todo){
    return console.log("ID not Found");
  }
  console.log("Todo by ID", todo);
});


//Hideous error catching.
//This error helps you see what happens if the object is NOT valid
//Like if it's too long or just incorrect format
Todo.findById(id).then((todo) => {
  if (!todo){
    return console.log("ID not Found");
  }
  console.log("Todo by ID", todo);
}).catch((e) => console.log(e));




// THIS ALLOWS TO MAKE SURE THAT IT IS ALL VALID;
if (!ObjectID.isValid(id)){
   return console.log("ID NOT VALID");
};


Todo.findById(id).then((todo) => {
  if (!todo){
    return console.log("ID not Found");
  }
  console.log("Todo by ID", todo);
}).catch((e) => console.log(e));
