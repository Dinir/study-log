/* eslint-disable no-undef */
const request = require('supertest');
const expect = require('expect');

const app = require('./server').app;

describe('server', () => {
  describe('GET /', () => {
    it('should return hello world response', (done) => {
      request(app)
        .get('/')
        .expect(404)
        // supertest only support this plain expect method, but you can wrap it with `expect` to add various test methods
        .expect((res) => {
          expect(res.body).toInclude({
            error: 'Page not found.'
          });
        })
        .end(done);
    });
  });
  describe('GET /users', () => {
    it('should return my entry in the users array', (done) => {
      request(app)
        .get('/users')
        .expect(200)
        .expect((res) => {
          expect(res.body).toInclude({
            name: 'Dinir', age: 12
          });
        })
        .end(done);
    });
  });
});
