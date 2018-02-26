function isPalindrome(rawString) {
  if(!rawString) return;

  // function will only check against lower case alphabets
  const validChars = [];
  for(let i = "a".charCodeAt(0); i <= "z".charCodeAt(0); i++)
    validChars.push(String.fromCharCode(i));

  // convert the string to lower case one, split into array of chars
  const string = rawString.toLowerCase();
  const chars = string.split("");
  // remove any non lower cased alphabets in the string
  chars.forEach((char, index) => {
    if(validChars.indexOf(char) === -1)
      chars.splice(index, 1);
  });

  return chars.join("") === chars.reverse().join("");
}

console.log(isPalindrome("Madam I'm Adam"));
console.log(isPalindrome("Race Car"));
console.log(isPalindrome("Hello Cat"));