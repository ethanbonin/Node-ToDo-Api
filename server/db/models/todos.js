//model of a Todo//
//You must set a type for everything inside there
var mongoose = require('mongoose');

var Todo = mongoose.model('Todo', {
  text: {
    type: String,
    required: true,
    minlength: 1, //Doesn't allow this to be just white space
    trim: true //Removes white space
  },
  complete: {
    type: Boolean,
    default: false, //You can default values so if they forget to set it
  },
  completedAt: {
    type: Number,
    default: null,
  },
});


module.exports = {
  Todo: Todo,
}


// var otherTodo = new Todo({
//   text: "Hello World!"
// });
//
//
//
// otherTodo.save().then((result) => {
//   console.log(result);
// }, (e) => {
//   console.log("error:", e);
// });
