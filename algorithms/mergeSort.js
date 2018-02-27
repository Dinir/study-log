/**
 * take in a single unsorted array and split it into two halves,
 * and calls {@see merge} to sort them.
 *
 * @param {number[]} array single unsorted array
 *
 * @return {number[]} one sorted array
 */
function mergeSort(array) {
  if(array.length <= 1) {
    return array;
  }
  const array1 = array.splice(0, Math.floor(array.length/2));
  const array2 = array;

  return merge(mergeSort(array1), mergeSort(array2));
}

/**
 * merge two sorted arrays into one sorted array
 *
 * @param {number[]} array1 one of two sorted array
 * @param {number[]} array2 one of two sorted array
 *
 * @return {number[]} one sorted array
 */
function merge(array1, array2) {
  let sorted = [];

  /*/ // my solution is too messy...

  let index1 = 0,
    index2 = 0;
  while(
    index1 < array1.length &&
    index2 < array2.length
  ) {
    switch (array1[index1] <= array2[index2]) {
      case true:
        sorted.push(array1[index1++]);
        break;
      case false:
        sorted.push(array2[index2++]);
        break;
    }
  }
  if(index1 < array1.length)
    sorted = sorted.concat(array1.splice(index1, array1.length - index1));
  else
    sorted = sorted.concat(array2.splice(index2, array2.length - index2));

  /*/

  while(
    array1.length && array2.length
  ) {
    if(array1[0] <= array2[0])
      sorted.push(array1.shift());
    else
      sorted.push(array2.shift());
  }

  if(array1.length)
    sorted = sorted.concat(array1);
  else
    sorted = sorted.concat(array2);

  //*/

  return sorted;
}

console.log(mergeSort([6000,34,203,3,746,200,984,198,764,1,9,1]));
console.log(mergeSort([100,-20,40,-30,16,-100,-101]));
// console.log(merge([7],[5]));