/**
 * returns all prime numbers up to the given number.
 * it checks up to `Math.floor(Math.sqrt(number))`.
 *
 * @param {number} number
 *
 * @return {number[]}
 */
function sieveOfEratosthenes(number) {
  /**
   * {@see https://jsperf.com/zero-filled-array-creation/17} says
   * that under Firefox 58.0.0 / Linux 0.0.0 (what a version number)
   * this method is fastest.
   *
   * gonna use the indexes of this array, so iterating from 0 to `number`.
   * the `numbers` array will therefore have a length of `number+1`.
   */
  const numbers = new Array(number);
  for(let i = 0; i <= number;) numbers[i++] = true;
  const primes = [];

  numbers[0] = numbers[1] = false;
  for(
    let currentNumber = 2;
    currentNumber <= Math.floor(Math.sqrt(number));
    currentNumber++
  ) {
    /*/

    let multipleOfCurrentNumber = currentNumber * 2;
    while(multipleOfCurrentNumber <= number) {
      numbers[multipleOfCurrentNumber] = false;
      multipleOfCurrentNumber += currentNumber;
    }

    /*/ // below is the solution shown in the course.

    for(
      let multiplier = 2;
      multiplier * currentNumber <= number;
      multiplier++
    ) {
      number[multiplier * currentNumber] = false;
    }

    //*/
  }
  numbers.forEach((value, index) => {
    if(value) primes.push(index);
  });

  return primes;
}

console.log(sieveOfEratosthenes(101));