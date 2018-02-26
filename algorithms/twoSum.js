/*
 now this is something I don't understand why to make
 the lecturer says they can be multiple ways to do this,
 and in two kind of time complexity: O(n^2) and O(n).
 but since I don't understand the question exactly,
 I won't try to make O(n^2).
*/

/**
 *
 * @param {number[]} numbers
 * @param {number} sum
 *
 * @return {number[][]}
 */
function twoSums(numbers, sum) {
  const twoSums = [];
  /*// put slash in the front of this line to test O(n^2) solution...
  // although I really hate making two loop with the iterator being 'i' and 'j'...
  for(let i = 0; i < numbers.length; i++) {
    for(let j = i+1; j < numbers.length; j++) {
      if(numbers[i] + numbers[j] === sum)
        twoSums.push([numbers[i], numbers[j]]);
    }
  }
  /*/
  const hashTable = [];

  for(let index = 0; index < numbers.length; index++) {
    let currentNumber = numbers[index];
    let counterpart = sum - currentNumber;
    if(hashTable.indexOf(counterpart) !== -1) {
      twoSums.push([currentNumber, counterpart]);
    }
    hashTable.push(currentNumber);
  }
  //*/

  return twoSums;
}

console.log(twoSums([1,6,4,5,3,3],7));
console.log(twoSums([40,-12,11,17,23,15],28));