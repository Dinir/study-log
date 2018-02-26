/*
 the lecturer says that breaking down each task in a separate function
 is the approach of functional programming.
 I do not exactly know what functional programming is at this point
 writing this comment.
 */

/*
 for an example set of numbers [1, 2, 4, 4, 8, 100, 102, 103],
 Mean is   40.5 <== (1+2+4+4+8+100+102+103)/8
 Median is  6   <== (4+8)/2,
                    the two number is middle ones in the set sorted
 Mode is    4   <== the most occurrence in the set
 */

/**
 * return mean of the set of numbers in a given array.
 * @param {number[]} array
 *
 * @return number
 */
function getMean(array) {
  let sum = 0;
  array.forEach(number => {
    sum += number;
  });
  return sum / array.length;
}
/**
 * return median of the set of numbers in a given array sorted by size.
 * @param {number[]} array
 *
 * @return number|NaN
 */
function getMedian(array) {
  array.sort((a, b) => a - b);
  const middlePosition = array.length / 2;
  switch(middlePosition % 1) {
    case .5:
      return array[Math.floor(middlePosition)];
    case 0:
      return (
        array[middlePosition - 1] +
        array[middlePosition]
      ) / 2;
  }
}
/**
 * return mode of the set of numbers in a given array.
 * @param {number[]} array
 *
 * @return number|null
 */
function getMode(array) {
  // hash table for all numbers in the set,
  // with their value set to their occurrence.
  const occurrenceTable = {};
  array.forEach(number => {
    if(!occurrenceTable[number]) occurrenceTable[number] = 0;
    occurrenceTable[number]++;
  });

  let mode = [];
  let currentMostOccurrence = 0;
  for(let number in occurrenceTable) {
    if(!occurrenceTable.hasOwnProperty(number)) continue;

    let currentOccurrence = occurrenceTable[number];
    if(currentOccurrence > currentMostOccurrence) {
      mode = [Number(number)];
      currentMostOccurrence = occurrenceTable[number];
    } else if(currentOccurrence === currentMostOccurrence) {
      mode.push(Number(number));
    }
  }

  // the lecturer said if every number occur in the same frequency,
  // there's no mode for the set.
  if(mode.length === Object.keys(occurrenceTable).length)
    mode = [];

  switch(mode.length) {
    case 1:
      return mode[0];
    case 0:
      return null;
    default:
      return mode;
  }
}

/**
 * Get mean, median, and mode of the set of numbers in a given array.
 * @see getMean
 * @see getMedian
 * @see getMode
 *
 * @param {number[]} array
 *
 * @return {{mean: number, median: number, mode: number}}
 */
function meanMedianMode(array) {
  if(!array.length) return null;
  return {
    mean: getMean(array),
    median: getMedian(array),
    mode: getMode(array)
  };
}

console.log(meanMedianMode([1, 2, 4, 4, 8, 100, 102, 102, 103, 105]));
console.log(meanMedianMode([1, 2, 3, 4, 5, 4, 6, 1]));
console.log(meanMedianMode([9, 10, 23, 10, 23, 9]));