let square = x => x * x;
console.log(square(9));

const user = {
  name: 'Dinir',
  // arrow functions will not bind `this`, `arguments` to any parent object
  sayHi: () => {
    console.log(arguments);
    console.log(`Hi, I'm ${this.name}`);
  },
  // this method inside an object will bind these to the parent object
  sayHiAlt () {
    console.log(arguments);
    console.log(`Hi, I'm ${this.name}`);
  }
};

user.sayHi(1, 2, 3);
user.sayHiAlt(1, 2, 3);