console.log("Starting app");

// load built-in modules
/** {@see https://nodejs.org/api/} */
const fs = require("fs");
const os = require("os");

let user = os.userInfo();

fs.appendFile(
  "greetings.txt",
  `Hello ${user.username}!`,
  err => {
    if(err)
      console.log("Unable to write to file.");
  }
);
