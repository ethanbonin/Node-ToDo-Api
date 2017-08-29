//3rd Party Modules
const expect = require('expect');
const request = require('supertest'); //Super tests do HTTP requests
var {ObjectID} = require('mongodb');

//Personal Modules
const {app} = require('./../server');
const {Todo} = require('./../db/models/todos');


const todos = [{
  _id: new ObjectID(),
  text: "First Todo"
}, {
  _id: new ObjectID(),
  text: "Second Todo"
}];




//Wiping the database! Everything inside of it
beforeEach((done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
})

describe('POST /todos', () => {

  //IT is a Async TEST
  it('should create a new todo', (done) => {
    var text = 'Test Todo';
    request(app)
    .post('/todos')
    .send({text})
    .expect(200) //Expect it to be good status
    .expect((res) => { // This creates a custom Expect
      expect(res.body.text).toBe(text);
    })
    .end((err, res) => {
      //If fails, then call done
      if (err) {
        return done(err);
      }

      //Checking the database
      Todo
      .find({text})
      .then((todos) => {
        expect(todos.length).toBe(1);
        expect(todos[0].text).toBe(text);
        done();
      })
      .catch((e) => {
        done(e);
      });
    })
  });


  it('should not send with bad data', (done) => {
    var text = '';
    request(app)
    .post('/todos')
    .send({})
    .expect(400) //Expect it to be good status
    .end((err, res) => {
      //If fails, then call done
      if (err) {
        return done(err);
      }

      //Checking the database
      //Making sure the database doesn't Change
      Todo
      .find()
      .then((todos) => {
        expect(todos.length).toBe(2);
        done();
      })
      .catch((e) => {
        done(e);
      });
    });
  });
});


describe('GET /todos', () => {
  it('should get all todos', (done) => {
    request(app)
    .get('/todos')
    .expect(200)
    .expect((res) => {
      expect(res.body.todos.length).toBe(2);
    })
    .end(done);
  })
});


describe('GET /todos/ids', () => {
  it('should get single Doc', (done) => {
    request(app)
    .get(`/todos/${todos[0]._id.toHexString()}`)
    .expect(200)
    .expect((res) => {
      expect(res.body.todo.text).toBe(todos[0].text);
    })
    .end(done);
  });


  it('should return 400 if bad ID', (done) => {
    request(app)
    .get('/todos/0928308290')
    .expect(400)
    .end(done);
  });

  it('should return a 404 if not found', (done) => {
    var hexID = new ObjectID();
    request(app)
    .get('/todos/'+hexID)
    .expect(404)
    .end(done);
  })
});


describe('DELETE /todos/:id', () => {
  it('should remove a todo', (done) => {
    var hexID = todos[1]._id.toHexString();
    request(app)
    .delete(`/todos/${hexID}`)
    .expect(200)
    .expect((res) => {
      expect(res.body.todo._id).toBe(todos[1]._id.toString());
    })
    .end((err, res) => {
      if (err) {
        return done(err);
      }

      Todo.findById(hexID).then((todo) => {
        expect(todo).toNotExist();
        done();
      }).catch((e) => done(e));
    });
  });

  it('should return 400 if bad ID', (done) => {
    request(app)
    .delete('/todos/0928308290')
    .expect(400)
    .end(done);
  });

  it('should return a 404 if not found', (done) => {
    var hexID = new ObjectID();
    request(app)
    .delete('/todos/'+hexID)
    .expect(404)
    .end(done);
  })




});
