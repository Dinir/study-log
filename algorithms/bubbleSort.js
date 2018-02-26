/**
 * return array, sorted with bubble sort
 *
 * @param {number[]} array
 *
 * @return {number[]}
 */
function bubbleSort(array) {
  //*/

  let comparisonsLeft = array.length - 1;
  while(comparisonsLeft) {
    for(let index = 0; index < comparisonsLeft; index++) {
      if(array[index] > array[index+1]) {
        array[index] = array[index] + array[index + 1];
        array[index + 1] = array[index] - array[index + 1];
        array[index] = array[index] - array[index + 1];
      }
    }
    comparisonsLeft--;
  }

  /*/ // below is the solution shown in the course.

  for(var i = array.length; i > 0; i--) {
    for(var j = 0; j < i; j++) {
      if(array[j] > array[j + 1]) {
        var temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
      }
    }
  }

  //*/

  return array;
}

console.log(bubbleSort([5,3,8,2,1,4]));
console.log(bubbleSort([20,20,31,56,1,12,12]));
console.log(bubbleSort([-7,9,-2,3,-6,5]));