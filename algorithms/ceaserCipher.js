function ceasarCipher(string, num = 0) {
  if(!string) return;


  const alphabet = [];
  for(let i = "a".charCodeAt(0); i <= "z".charCodeAt(0); i++)
    alphabet.push(String.fromCharCode(i));
  const lowercaseString = string.toLowerCase();
  const numberInRange = num % alphabet.length;
  let newString = "";

  // for each letter in the text, try to find new letter
  for(let index = 0; index < lowercaseString.length; index++) {
    // these variables are related to each original letter
    let currentLetter = lowercaseString[index];
    let currentAlphabetIndex = alphabet.indexOf(currentLetter);

    // if the letter is not alphabet, keep it
    if(currentAlphabetIndex === -1) {
      newString += currentLetter;
      continue;
    }
    // find new letter's index
    let newAlphabetIndex =
      (currentAlphabetIndex + numberInRange) % alphabet.length;
    if(newAlphabetIndex < 0) newAlphabetIndex += alphabet.length;
    // if the original letter is a capital one, capitalize the new letter
    if(string[index] === lowercaseString[index].toUpperCase())
      newString += alphabet[newAlphabetIndex].toUpperCase();
    else
      newString += alphabet[newAlphabetIndex];
  }

  return newString;
}

console.log(ceasarCipher("Zoo Keeper", 2));
console.log(ceasarCipher("Big Car", -16));
console.log(ceasarCipher("Javascript", -900));