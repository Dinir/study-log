/* eslint-disable no-undef */
const expect = require('expect');

const utils = require('./utils');

describe('utils', () => {

  describe('#add', () => {
    // behaviour driven development

    it('should add two numbers', () => {
      const res = utils.add(33, 11);
      /*if(res !== 44) {
        throw new Error(`Expected 44, but got ${res}.`);
      }*/
      expect(res).toBeA('number').toBe(44);
    });

  });

  it('should square a number', () => {
    const res = utils.square(7);
    /*if(res !== 49) {
      throw new Error(`Expected 49, but got ${res}.`);
    }*/
    expect(res).toBeA('number').toBe(49);
  });

  // asynchronous function tests
  it('should async add two numbers', (done) => {
    utils.asyncAdd(4, 3, (sum) => {
      // this assertion alone will not work. mocha see the function is fired, so it consider the test to be passing.
      expect(sum).toBe(7).toBeA('number');
      // by adding the parameter `done`, mocha will see you're going to test an asynchronous function.
      done();
    });
  });
  it('should async square a number', (done) => {
    utils.asyncSquare(7, (res) => {
      expect(res).toBe(49).toBeA('number');
      done();
    });
  });

  it('should include proper values for first name and last name', () => {
    const userTest = {
      age: 12,
      location: 'Internet'
    };
    const res = utils.setName(userTest, 'Dinir Nertan');
    expect(userTest)
      .toEqual(res)
      .toBeA('object')
      .toInclude({
        firstName: 'Dinir',
        lastName: 'Nertan',
      });
  });
});


/*it('should expect some values', () => {
  // expect(12).toNotBe(11);
  // expect({name: 'Dinir'}).toNotEqual({name: 'dinir'});
  // expect([2,3,4]).toExclude(2);
  expect({
    name: 'Dinir',
    age: 12,
    location: 'Internet'
  }).toExclude({
    age: 13
  });
});*/

