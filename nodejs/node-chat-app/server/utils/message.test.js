/* eslint-disable no-undef */
const expect = require('expect');

const {generateMessage} = require('./message');

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