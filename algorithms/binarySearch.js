/**
 * search number `key` in array `numbers` and return if it exists in the array.
 *
 * @param {number[]} numbers
 * @param {number} key
 *
 * @return bool
 */
function binarySearch(numbers, key) {
  const middleIndex = Math.floor(numbers.length / 2);
  const middleNumber = numbers[middleIndex];
  // console.log(`[${numbers}], middle point is ${middleIndex}:${middleNumber}`);
  if(key === middleNumber) return true;
  else if(numbers.length > 1) {
    if(key < middleNumber)
      return binarySearch(numbers.splice(0, middleIndex), key);
    else
      return binarySearch(numbers.splice(middleIndex + 1), key);
  } else
    return false;
}
/*
 the lecturer's approach is:
                             <-compare->
 [ 0, 1, ..., middleIndex-1, middleIndex, middleIndex+1, ..., n ]
   <---if key is smaller-->  <--------if key is bigger-------->

 I approached with this:
                             <-compare->
 [ 0, 1, ..., middleIndex-1, middleIndex, middleIndex+1, ..., n ]
   <---if key is smaller-->               <--if key is bigger->

 I'm not sure if it's right to insist on going with my approach...
 */

console.log(binarySearch([5,7,12,16,36,39,42,56,71,72], 15));