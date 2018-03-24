/* eslint-disable no-undef */
const expect = require('expect');

const {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    const from = 'Test User';
    const text = 'Test Text';
    const testMessage = generateMessage(from, text);

    /*expect(testMessage.from).toBe(from);
    expect(testMessage.text).toBe(text);*/
    expect(testMessage).toMatchObject({from, text});
    expect(typeof testMessage.createdAt).toBe('number');
  });
});

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    const from = 'Test User';
    const latitude = 1;
    const longitude = 2;
    const url = 'https://google.com/maps?q=1,2';
    const testMessage = generateLocationMessage(from, latitude, longitude);

    expect(testMessage).toMatchObject({
      from,
      url
    });
    expect(typeof testMessage.createdAt).toBe('number');
  });
});
