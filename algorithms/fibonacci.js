// this is the easiest solution, yet really not effective...
/*
function fibonacci(position) {
  if(position<=0) return null;
  if(position<=2) return 1;
  return fibonacci(position-1) + fibonacci(position-2);
}
*/

// the lecturer introduce Memoized Fibonacci algorithm.
/**
 *
 * @var {number} index index of number n fibonacci sequence
 * @var {number[]} cache an array used as memory
 */
function fibMemo(index, cache = []) {
  // cache = cache || [];
  if(cache[index]) return cache[index];
  if(index<=0) return null;
  if(index<=2) return 1;
  cache[index] = fibMemo(index-1, cache) + fibMemo(index-2, cache);

  return cache[index];
}
// I guess cache is shared in any layer in the callstack...

/*
for(let i=-2; i<10; i++) {
  console.log(fibonacci(i));
}
*/
console.log(fibMemo(1200));