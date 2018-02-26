function harmlessRansomNote(noteText, magazineText) {
  // Arr variable will hold words of the original texts
  // Obj will hold the number a word appears in the original text
  const noteArr = noteText.split(" ");
  const magazineArr = magazineText.split(" ");
  const magazineObj = {};
  let noteIsPossible = true;

  magazineArr.forEach(word => {
    if(!magazineObj[word]) magazineObj[word] = 0;
    magazineObj[word]++;
  });

  noteArr.forEach(word => {
    if(magazineObj[word]) {
      magazineObj[word]--;
      // double check just in case
      if(magazineObj[word] < 0) noteIsPossible = false;
    }
    else noteIsPossible = false;
  });

  return noteIsPossible;
}

console.log(
  harmlessRansomNote("this is a secret note for you from a secret admirer", "puerto rico is a place of great wonder and excitement it has many secret waterfall locatoins that i am an admirer of you must hike quite a distance to find the secret places as they are far from populated areas but it is worth the effort a tip i have for you is to go early in the morning when it is not so hot out also note that you must wear hiking boots this is one of the best places i have ever visited")
);