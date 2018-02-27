console.log("Starting app.js.");

/** {@see https://nodejs.org/api/} */
// load built-in modules
const fs = require("fs");
const os = require("os");
// load own files
const notes = require("./notes.js");
// load third-party modules
const _ = require("lodash");

console.log(_.isString(true));
console.log(_.isString("Dinir"));
let filteredArray = _.uniq(["Dinir", 1, "Dinir", 1, 2, 3, 4]);
console.log(filteredArray);

/*
let user = os.userInfo();

fs.appendFile(
  "greetings.txt",
  `Hello ${user.username}! You are ${notes.age}.`,
  err => {
    if(err)
      console.log("Unable to write to file.");
  }
);
*/
