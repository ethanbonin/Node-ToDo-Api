//--------------IMPORTANT READ FIRST ----------//

//Make sure inside hte package.json that you add the START SCRIPT for heroku!
//Make sure to add an engines Property!

//--------------------------------------------//


var {mongoose} = require('./db/mongoose');
var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var {Todo} = require('./db/models/todos');
var {User} = require('./db/models/users');


var app = express();
//Checks the local environment. If it's not there, then use 3000
const _PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

//Body gets stored by bodyParser
app.post('/todos', (req, res) => {
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




app.get('/todos/:id', (req, res) => {
    var id = req.params.id


    //Responde if it's not VALID
    if (!ObjectID.isValid(id)){
      return res.status(400).send();
    }

    Todo.findById(id).then((todo) => {
      if (!todo) {
        return res.status(404).send();
      }
      res.send({todo});
    }).catch((e) => {
      res.status(400).send();
    })

});


app.delete('/todos/:id', (req, res) => {
  var id = req.params.id
  //Responde if it's not VALID
  if (!ObjectID.isValid(id)){
    return res.status(400).send();
  };

  Todo.findByIdAndRemove(id).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    };
    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  });

});





app.listen(_PORT, () => {
  console.log("Running on port: " + _PORT);
});


module.exports = {app};
