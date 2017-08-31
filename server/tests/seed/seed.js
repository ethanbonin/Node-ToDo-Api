var {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Todo} = require('./../../db/models/todos');
const {User} = require('./../../db/models/users');


const userOneID = new ObjectID();
const userTwoID = new ObjectID();

const users = [{
  _id: userOneID,
  email: 'ethan@example.com',
  password: 'mypassword1',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: userOneID, access: 'auth'}, process.env.JWT_SECRET).toString()
  }]
}, {
  _id: userTwoID,
  email: 'ethan@badexample.com',
  password: 'mypassword2',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: userTwoID, access: 'auth'}, process.env.JWT_SECRET).toString()
  }]
}];



const todos = [{
  _id: new ObjectID(),
  text: "First Todo",
  _creator: userOneID
}, {
  _id: new ObjectID(),
  text: "Second Todo",
  completed: true,
  completedAt: 222,
  _creator: userTwoID
}];



const populateTodos = (done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
}


const populate_users = (done) => {
  User.remove({}).then(() => {
    var userOne = new User(users[0]).save();
    var userTwo = new User(users[1]).save();


    //Because both users are Async, we want to wait until both are completed
    //So Promise.all waits for everyting to finish
    return Promise.all([userOne, userTwo]);
  }).then(() => done(), (e) => console.log(e));

};

//Wiping the database! Everything inside of it

module.exports = {
  todos,
  populateTodos,
  users,
  populate_users
};
