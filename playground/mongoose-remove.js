const {ObjectID} = require('mongodb');

var {mongoose} = require('../server/db/mongoose');
var {Todo} = require('../server/db/models/todos');

var id = '59a334da4ca0212a4e291d77'



Todo.remove({}).then((result) => {
  console.log(result);
});


Todo.findOneAndRemove({_id: 'lajsdfljadlskjfkl'}).then((result) => {
  console.log(result);
});

Todo.findByIdAndremove('lkajsdlfjkldasljf').then((result) => {
  console.log(result);
});
