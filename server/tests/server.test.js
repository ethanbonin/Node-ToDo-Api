//3rd Party Modules
const expect = require('expect');
const request = require('supertest'); //Super tests do HTTP requests

//Personal Modules
const {app} = require('./../server');
const {Todo} = require('./../db/models/todos');

//Wiping the database! Everything inside of it
beforeEach((done) => {
  Todo.remove({}).then(() => done());
})

describe('SERVER TEST', () => {

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
      .find()
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
      Todo
      .find()
      .then((todos) => {
        expect(todos.length).toBe(0);
        done();
      })
      .catch((e) => {
        done(e);
      });
    })
  })
});
