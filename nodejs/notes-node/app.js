/** {@see https://nodejs.org/api/} */
// load built-in modules
const fs = require('fs');
// load third-party modules
const _ = require('lodash');
const yargs = require('yargs');

// load own files
const notes = require('./notes.js');

const options = {
  title: {
    describe: 'Title of note',
    demand: true,
    alias: 't'
  },
  body: {
    describe: 'Body of note',
    demand: true,
    alias: 'b'
  }
};

const argv = yargs
  .command('add', 'Add a new note', {
    title: options.title,
    body: options.body
  })
  .command('list', 'List all notes')
  .command('read', 'Read a note', {
    title: options.title
  })
  .command('remove', 'Remove a note', {
    title: options.title
  })
  .help()
  .argv;
let command = argv._[0];

if(command === 'add') {
  const note = notes.addNote(argv.title, argv.body);
  if(note) {
    console.log('Note added:');
    notes.logNote(note);
  } else {
    console.log('Note name is already in use.');
  }
} else if(command === 'list') {
  const allNotes = notes.getAll();
  console.log(`Printing ${allNotes.length} note(s).`);
  allNotes.forEach(note => notes.logNote(note));
} else if(command === 'read') {
  const note = notes.getNote(argv.title);
  if(note) {
    notes.logNote(note);
  } else {
    console.log('Note not found.');
  }
} else if(command === 'remove') {
  const noteRemoved = notes.removeNote(argv.title);
  const message = noteRemoved?
    'Note was removed.':
    'Note not found.';
  console.log(message);
} else {
  console.log('Command not recognized.');
}