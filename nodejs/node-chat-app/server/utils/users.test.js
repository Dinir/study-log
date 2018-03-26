/* eslint-disable no-undef */
const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {
  let users;
  let userAmount;

  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'seedUser',
      room: 'Node Course'
    },{
      id: '2',
      name: 'seedUserSecond',
      room: 'React Course'
    },{
      id: '3',
      name: 'lastSeedUser',
      room: 'Node Course'
    }];
    userAmount = users.users.length;
  });

  it('should add new user', () => {
    const users = new Users();
    const user = {
      id: 'asdfg',
      name: 'testName',
      room: 'testRoom'
    };
    const resUser = users.addUser(
      user.id, user.name, user.room
    );
    expect(users.users).toEqual([user]);
  });

  it('should remove a user', () => {
    const userId = '2';
    const removed = users.removeUser(userId);

    expect(removed.id).toBe(userId);
    expect(users.users).not.toContain(removed);
    expect(users.users.length).toBe(userAmount - 1);
  });

  it('should not remove a user', () => {
    const userId = '333333';
    const removed = users.removeUser(userId);

    expect(removed).toBeFalsy();
    expect(users.users.length).toBe(userAmount);
  });

  it('should find user', () => {
    const userId = '2';
    const user = users.getUser(userId);

    expect(user.id).toBe(userId);
  });

  it('should not find user', () => {
    const userId = '333333';
    const user = users.getUser(userId);

    expect(user).toBeFalsy();
  });

  it('should return names for node course', () => {
    const userList = users.getUserList('Node Course');
    expect(userList).toEqual([
      'seedUser', 'lastSeedUser'
    ]);
  });

  it('should return names for react course', () => {
    const userList = users.getUserList('React Course');
    expect(userList).toEqual([
      'seedUserSecond'
    ]);
  });
});
