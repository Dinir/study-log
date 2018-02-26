// without making new array and returning that array,
// and `Array.prototype.reverse()`,
// the goal is return an array with its contents reversed in order
function reverseArrayInPlace(array) {
  /*/ add single slash at the front of this line to use the solution I made

  // starting from second element from the last
  let index = array.length - 2;

  // was not confident about putting the condition to just be `length`
  while(index >= 0) {
    array.push(array.splice(index, 1).pop());
    index--;
  }

  /*/

  // this is the solution the course has shown.
  for(let index = 0; index < array.length/2; index++) {
    let temp = array[index];
    array[index] = array[array.length - 1 - index];
    array[array.length - 1 - index] = temp;
  }

  //*/

  return array;
}

console.log(reverseArrayInPlace([2,3,5,7,11,13,17,19,23]));