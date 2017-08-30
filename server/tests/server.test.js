//3rd Party Modules
const expect = require('expect');
const request = require('supertest'); //Super tests do HTTP requests
var {ObjectID} = require('mongodb');
const util = require('util')


//Personal Modules
const {app} = require('./../server');
const {Todo} = require('./../db/models/todos');
const {User} = require('./../db/models/users');
const {todos, populateTodos, users, populate_users} = require('./seed/seed');

beforeEach(populate_users);
beforeEach(populateTodos);

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



describe('PATCH /todos/:id', () => {
  it('should update the todo', (done) => {
    var hexID = todos[1]._id.toHexString();
    var text = 'This should be the new test';

    request(app)
    .patch('/todos/'+hexID)
    .send({
      completed: true,
      text: text
    })
    .expect(200)
    .expect((res) => {
      expect(res.body.todo.text).toBe(text);
      expect(res.body.todo.completed).toBe(true);
      expect(res.body.todo.completedAt).toBeA('number');
    })
    .end(done);
  });

  it('should clear completedAt at when todo is not completed', (done) => {
    var hexID = todos[1]._id.toHexString();
    var text = 'This should be the new test';
    request(app)
    .patch('/todos/'+hexID)
    .send({
      completed: false,
      text: text
    })
    .expect(200)
    .expect((res) => {
      // expect(res.body.todo.text).toBe(text);
      expect(res.body.todo.completed).toBe(false);
      expect(res.body.todo.completedAt).toNotExist();
    })
    .end(done);
  });
});


describe('GET /users/me (ASYNC)', () => {
  it('should return users if authenticated', (done) => {
    request(app)
    .get('/users/me')
    .set('x-auth', users[0].tokens[0].token)
    .expect(200)
    .expect((res) => {
      expect(res.body._id).toBe(users[0]._id.toHexString());
      // expect(res.body.email).toBe(users[0]._email.toHexString());
    })
    .end(done);
  });


  it('should return 401 if not authenticated', (done) => {
      request(app)
      .get('/users/me')
      .expect(401)
      .expect((res) => {
        expect(res.body).toEqual({});
      })
      .end(done);
  });
});


describe('POST /users', () => {
  it('should create a user', (done) => {
    var email = 'email@example.com'
    var password = 'password123'

    request(app)
    .post('/users')
    .send({email, password})
    .expect(200)
    .expect((res) => {
       expect(res.headers['x-auth']).toExist();
       expect(res.body._id).toExist();
       expect(res.body.email).toBe(email);
    })
    .end((err) => {
      if (err){
        return done(err);
      }

      User.findOne({email}).then((user) => {
        expect(user).toExist();
        expect(user.passowrd).toNotBe(password);
        done();
      });
    });
  });


  it('should return validation error if request invalid', (done) => {
    var email = 'email'
    var password = 'password123'

    request(app)
    .post('/users')
    .send({email, password})
    .expect(400)
    .end(done);
  });


  it('should not create user if email is in use', (done) => {
    request(app)
    .post('/users')
    .send({email: users[0].email, password: users[0].password})
    .expect(400)
    .end(done);
  });
});

describe('POST /users/login', () => {

  it('should login user and return token', (done) => {

    //You are going to use user ONE without a token to make sure that
    // it ends up getting a token!
    request(app)
    .post('/users/login')
    .send({email: users[1].email, password: users[1].password})
    .expect(200)
    .expect((res) => {
      expect(res.headers['x-auth']).toExist();
    })
    .end((err, res) => {
      if (err) {
        return done(err);
      }


      User.findById(users[1]._id).then((user) => {
        expect(user.tokens[0]).toInclude({
          access: 'auth',
          token: res.headers['x-auth']
        });
        done()
      }).catch((e) => {
        done(e);
      })
    })
  })


  it('should reject invalid login', (done) => {
    request(app)
    .post('/users/login')
    .send({email: users[1].email, password: users[0].password})
    .expect(400)
    .end(done);
  });
});



describe('DELETE /users/me/token', () => {


  it('should delete the token and logout the person', (done) => {
    request(app)
    .delete('/users/me/token')
    .set('x-auth', users[0].tokens[0].token)
    .expect(200)
    .end((err, res) => {
      if (err) {
        return done(err);
      }

      User.findById(users[0]._id).then((user) => {
        expect(user.tokens.length).toBe(0);
        done();
      }).catch((e) => done(e));
    });
  });
});
