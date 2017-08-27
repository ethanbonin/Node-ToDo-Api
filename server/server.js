var {mongoose} = require('./db/mongoose');
var express = require('express');
var bodyParser = require('body-parser');

var {Todo} = require('./db/models/todos');
var {User} = require('./db/models/users');


var app = express();

app.use(bodyParser.json());

//Body gets stored by bodyParser
app.post('/todos', (req, res) => {
  console.log(req.body);
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  })

});

app.get('/todos', (req, res) => {
  Todo
  .find()
  .then((todos) => {
    res.send({todos});
  })
  .catch((e) => {
    console.log("Error", e);
  });
});

app.listen(3000, () => {
  console.log("Running on port: 3000");
});


module.exports = {app};
