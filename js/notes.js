var notesModule = (function() {

  var notes = [
    {
      created: new Date(),
      modified: new Date(),
      title: 'Test Note1231231231234444',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      color: '#e74c3c'
    },
    {
      created: new Date(),
      modified: new Date(),
      title: 'Cicero',
      content: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
      color: '#3498db'
    },
    {
      created: new Date(),
      modified: new Date(),
      title: 'Lorem Ipsum',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      color: '#f1c40f'
    }
  ];

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
    if(notes.length){
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

    refreshNotes();
    getNote(id);
  }

  function deleteNote(id) {
    notes.splice(id, 1);
    refreshNotes();
    newNote();
  }

  function formatDate(date) {
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
