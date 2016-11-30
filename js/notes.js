var notesModule = (function() {

  if(localStorage.getItem('notes') == null) {
    localStorage.setItem('notes', JSON.stringify([]));
  }

  var notes = JSON.parse(localStorage.getItem('notes'));

  var notesList = document.getElementById('notes');
  var notesView = document.getElementById('notesView');

  var elements = getInputs();

  function getInputs() {
    var noteColorElement = document.getElementById('noteColor');
    var modalTitleElement = document.getElementById('noteTitle');
    var modalContentElement = document.getElementById('noteContent');

    // buttons
    var submitButton = document.getElementById('submit');
    var deleteButton = document.getElementById('delete');
    var updateButton = document.getElementById('update');
    var validationElement = document.getElementById('validation');

    return {
      colorInput: noteColorElement,
      titleInput: modalTitleElement,
      contentInput: modalContentElement,
      submitButton: submitButton,
      deleteButton: deleteButton,
      updateButton: updateButton,
      validationElement: validationElement
    };
  }

  function resetInputs() {
    elements.colorInput.value = '';
    elements.titleInput.value = '';
    elements.contentInput.value = '';
    elements.validationElement.innerHTML = '';
  }

  function refreshNotes() {
    // clear the notes container
    notesList.innerHTML = '';
    if(notes){
      console.log(notes);
      notes.forEach(function(note, index) {
        var anchorElement = document.createElement('a');
        anchorElement.setAttribute('href', '#' + index);

        var noteElement = document.createElement('div');
        noteElement.className = 'note';
        noteElement.setAttribute('data-id', index);
        noteElement.setAttribute('style', 'background-color:' + note.color);

        // title
        var titleElement = document.createElement('span');
        var titleText = document.createTextNode(note.title);
        titleElement.appendChild(titleText);

        // date
        var dateElement = document.createElement('span');
        var dateText = document.createTextNode(formatDate(note.modified).split(' ')[0]);
        dateElement.className = 'date';
        dateElement.appendChild(dateText);

        noteElement.appendChild(dateElement);
        noteElement.appendChild(titleElement);
        noteElement.onclick = function() {
          getNote(this.getAttribute('data-id'))
        };
        anchorElement.appendChild(noteElement);

        // delete button
        elements.deleteButton.setAttribute('data-id', index);

        notesList.appendChild(anchorElement);
      });
    } else {
      newNote();
    }
  }

  function getNote(id) {
    resetInputs();

    elements.colorInput.value = notes[id].color;
    elements.titleInput.value = notes[id].title;
    elements.contentInput.value = notes[id].content;

    elements.deleteButton.setAttribute('data-id', id);
    elements.deleteButton.style.display='block';

    elements.updateButton.setAttribute('data-id', id);
    elements.updateButton.style.display = 'block';

    elements.submitButton.style.display = 'none';

    elements.validationElement.style.display = 'block';
    elements.validationElement.innerHTML = '<div>Last Updated: ' + formatDate(notes[id].modified) + '.';
  }

  function newNote() {
    resetInputs();

    elements.submitButton.style.display = 'block'
    elements.updateButton.style.display = 'none';
    elements.deleteButton.style.display='none';
    elements.validationElement.style.display='none';
  }

  function addNote() {
    var date = new Date();

    if(elements.titleInput.value == '' || elements.contentInput.value == '') {
      elements.validationElement.style.display = 'block';
      elements.validationElement.innerHTML = '<div style="color:red">The Title or Note cannot be empty.</div>';
    } else {
      var note = {
        created: date,
        modified: date,
        title: elements.titleInput.value,
        content: elements.contentInput.value,
        color: elements.colorInput.value
      }
      // shorthand in es6 would just be {date, title, content}
      notes.push(note);
      localStorage.setItem('notes', JSON.stringify(notes));
      resetInputs();
      refreshNotes();
      getNote(notes.length-1);
      elements.validationElement.style.display = 'block';
      elements.validationElement.innerHTML = '<div>Note Created!</div>';
    };
  }

  function updateNote(id) {
    var date = new Date()

    notes[id].modified = date;
    notes[id].color = elements.colorInput.value;
    notes[id].title = elements.titleInput.value;
    notes[id].content = elements.contentInput.value;
    localStorage.setItem('notes', JSON.stringify(notes));
    refreshNotes();
    getNote(id);
  }

  function deleteNote(id) {
    notes.splice(id, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    refreshNotes();
    newNote();
  }

  function formatDate(dateString) {
    var date = new Date(dateString);
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var year = date.getFullYear();
    var hour = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    return month+'/'+day+'/'+year+' '+hour+':'+minutes+':'+seconds;
  }

  return {
    refreshNotes: refreshNotes,
    newNote: newNote,
    addNote: addNote,
    updateNote: updateNote,
    deleteNote: deleteNote
  }

})();
