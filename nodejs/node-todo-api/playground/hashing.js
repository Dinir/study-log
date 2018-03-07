// const message = 'I am user number 3';
// let hash = SHA256(message).toString();
//
// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);

/* example of salting a hash

// const {SHA256} = require('crypto-js');

// let's say you want to send this data to the client
const data = {
  id: 4
};

// you'll send the data in this form
// note that the hash is salted by adding a secret string to the stringified data. the client is not supposed to know the string.
const token = {
  data,
  hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
};

// the client (or the man in the middle) manipulating the token
token.data.id = 5;
token.hash = SHA256(JSON.stringify(token.data)).toString();

// you get back the token from the client, and compare the hash of the token with the hash you have, using the same salt.
// as long as the client doesn't know the salt, they won't be able to manipulate the hash and keep it being valid.
const resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

if(resultHash === token.hash) {
  console.log('Data was not changed');
} else {
  console.log('Data was changed. Do not trust.');
}

*/

/*
const jwt = require('jsonwebtoken');

const data = {
  id: 10
};

// the client will receive this data and send it back
const token = jwt.sign(data, '123abc');

const decoded = jwt.verify(token, '123abc');

console.log('decoded', decoded);
*/

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const password = '123abc!';

// bcrypt.genSalt(10, (err, salt) => {
//   bcrypt.hash(password, salt, (err, hash) => {
//     console.log(hash);
//   });
// });

const hashedPassword = '$2a$10$ZPAXEikKTafnETMK5d/iKelc52UJ.wnFHf4mXB0xrDJkzYzIO3ilu';

bcrypt.compare('123!', hashedPassword, (err, res) => {
  console.log(res);
});
