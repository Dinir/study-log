/*
n : next code
c : continue executing
list(number) : show number of lines around current break point
repl : go into a repl mode where you can type javascript commands to inspect
 */

let person = {
  name: 'Andrew'
};
person.age = 23;

debugger;

person.name = 'Mike';

console.log(person);