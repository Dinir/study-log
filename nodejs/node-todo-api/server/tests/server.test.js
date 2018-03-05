/* eslint-disable no-undef */
const expect = require('expect');
const request = require('supertest');

const {app} = require('../server');
const {Todo} = require('../models/todo');
const {User} = require('../models/user');

// testing the lifecycle by doing an initializing task before each test
beforeEach((done) => {
  // actually wipes all the documents
  Todo.remove({}).then(() => done());
});

describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    const text = 'Eat dinner';

    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      // after the end of testing the response, it will check the db.
      .end((err, res) => {
        if(err)
          return done(err);

        Todo.find().then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => done(e));
      });
  });

  it('should not create todo with invalid body data', (done) => {
    request(app)
      .post('/todos')
      .send() // intentionally send empty body
      .expect(400)
      .end((err, res) => {
        if(err)
          return done(err);

        Todo.find().then((todos) => {
          expect(todos.length).toBe(0);
          done();
        }).catch((e) => done(e));
      });
  });
});
