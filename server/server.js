//--------------IMPORTANT READ FIRST ----------//

//Make sure inside hte package.json that you add the START SCRIPT for heroku!
//Make sure to add an engines Property!

//--------------------------------------------//



require('./config/config');


var {mongoose} = require('./db/mongoose');
var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');
const _ = require('lodash');


var {Todo} = require('./db/models/todos');
var {User} = require('./db/models/users');
var {authenticate} = require('./middleware/authenticate');


var app = express();
//Checks the local environment. If it's not there, then use 3000
const _PORT = process.env.PORT;

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

app.patch('/todos/:id', (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectID.isValid(id)){
    return res.status(400).send();
  };


  if (body.completed){
    body.completedAt = new Date().getTime();
  } else {
      body.completed = false;
      body.completedAt = null;
      body.text = "Wasn't able to change";
  }

  //--------------------(ID, WHAT TO DO, )
  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then(((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    res.send({todo});
  })).catch((e) => {
    res.status(400).send();
  })
});


//--------USER SERVER ENDPOINTS-------//
app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);

  user.save().then(() => {
    //Instance Methods
    //Also this is a promise from the user model function. Because we
    //returned it.
    return user.generateAuthToken();
  }).then((token) => {
    //x-anything means it's a custom header
    res.header('x-auth', token).send(user);
  }).catch((e) => {
    res.status(400).send(e);
  });
});


app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});



app.post('/users/login', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  User.findByCredentials(body.email, body.password).then((user) => {
    return user.generateAuthToken().then((token) => {
      res.header('x-auth', token).send(user);
    })
  }).catch((e) => {
    res.status(400).send();
  });
});





app.listen(_PORT, () => {
  console.log("Running on port: " + _PORT);
});


module.exports = {app};
