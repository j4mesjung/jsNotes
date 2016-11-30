// new note button/modal
var newNoteButton = document.getElementById('newNote');
newNoteButton.onclick = function() {
  notesModule.newNote();
};

// delete button
var deleteButton = document.getElementById('delete');
deleteButton.onclick = function(e) {
  notesModule.deleteNote(e.target.getAttribute('data-id'));
}

// submit button
var submitButton = document.getElementById('submit');
submitButton.onclick = function() {
  notesModule.addNote();
};

// update button
var updateButton = document.getElementById('update');
updateButton.onclick = function(e) {
  notesModule.updateNote(e.target.getAttribute('data-id'));
};

notesModule.refreshNotes();
notesModule.newNote();
