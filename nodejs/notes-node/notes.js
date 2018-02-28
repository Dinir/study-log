const fs = require('fs');

/**
 * try to fetch the saved notes, and return the fetched notes if there is one.
 * @returns {Array} notes data. A blank array if there is none.
 */
const fetchNotes = () => {
  try {
    let notesString = fs.readFileSync('./notes-data.json');
    return JSON.parse(notesString);
  } catch (e) {
    return [];
  }
};
/**
 * save the given notes data into a json file.
 *
 * @param {Array} notes notes data to save.
 */
const saveNotes = notes => {
  fs.writeFileSync('./notes-data.json', JSON.stringify(notes));
};

const addNote = (title, body) => {
  const notes = fetchNotes();
  const note = {title, body};

  const duplicateNotes = notes.filter(note => note.title === title);

  if (duplicateNotes.length === 0) {
    notes.push(note);
    saveNotes(notes);
    return note;
  }
};
const getAll = () => {
  return fetchNotes();
};
const getNote = title => {
  const notes = fetchNotes();
  const noteToGet = notes.filter(note => note.title === title);

  if(noteToGet.length === 1) {
    return noteToGet[0];
  }
};
const removeNote = title => {
  const notes = fetchNotes();
  const notesToKeep = notes.filter(note => note.title !== title);
  saveNotes(notesToKeep);

  return notes.length !== notesToKeep.length;
};
const logNote = note => {
  console.log(`--\n${note.title}\n${note.body}`);
};

module.exports = {
  addNote,
  getAll,
  getNote,
  removeNote,
  logNote
};