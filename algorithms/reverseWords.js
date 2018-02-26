// without using 'Array.prototype.reverse()`
// the goal is reverse every word while keeping the order of the words
function reverseWords(string) {
  if(!string) return;

  // I went making a single array to contain original words
  // and then change these to the reversed ones
  let words = string.split(" ");

  /*/ add single slash at the front of this line to use the solution I made

  // I tried splitting each word and go through each letter in order
  // to add the letters to `reversedWord` using `Array.prototype.shift()`.
  // But using a simple for loop reduces arrays I was gonna make for each word.
  words = words.map(word => {
    let currentWord = word.split("");
    let reversedWord = "";
    while(currentWord.length) {
      reversedWord = currentWord.shift() + reversedWord;
    }
    return reversedWord;
  });

  /*/

  // this is the solution the course has shown.
  // I modified it a little to process with a single array
  // the solution is that you use a for loop to grab a letter in the word
  words = words.map(word => {
    let reversedWord = "";
    for(let index = word.length - 1; index >= 0; index--) {
      reversedWord += word[index];
    }
    return reversedWord;
  });

  //*/

  return words.join(" ");
}

console.log(reverseWords("this is a string of words"));