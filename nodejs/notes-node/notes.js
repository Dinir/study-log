console.log("Starting notes.js.");

// if it's an anonymous function, converting it to an arrow function is okay.
// the big difference is that the arrow function doesn't bind to `this`, `argument` array.
module.exports.addNote = () => {
  console.log("addNote");
  return "New note";
};

module.exports.add = (a, b) => a + b;
