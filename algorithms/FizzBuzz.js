/*function fizzBuzz(num) {
  for(let i = 1; i <= num; i++) {
    if(i % 15 === 0) console.log("FizzBuzz");
    else if(i % 3 === 0) console.log("Fizz");
    else if(i % 5 === 0) console.log("Buzz");
    else console.log(i);
  }
}*/

function fizzBuzz(num, displayMethod = console.log) {
  for(let i = 1; i <= num; i++) {
    if(i % 15 === 0) displayMethod("FizzBuzz");
    else if(i % 3 === 0) displayMethod("Fizz");
    else if(i % 5 === 0) displayMethod("Buzz");
    else displayMethod(i);
  }
}

fizzBuzz(30);