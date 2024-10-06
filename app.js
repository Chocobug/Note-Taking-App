// Select elements from the DOM
const noteInput = document.getElementById("note-input");
const saveNoteBtn = document.getElementById("save-note");
const notesList = document.getElementById("notes-list");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");

// Load notes from localStorage on page load
document.addEventListener("DOMContentLoaded", loadNotes);

// Save note when the "Save Note" button is clicked
saveNoteBtn.addEventListener("click", saveNote);

// Function to save the note to localStorage
function saveNote() {
  const noteText = noteInput.value.trim(); // Get the input value

  if (noteText === "") {
    alert("Please enter a note!");
    return;
  }

  // Retrieve existing notes from localStorage or create an empty array
  let notes = JSON.parse(localStorage.getItem("notes")) || [];

  // Add the new note to the array
  notes.push(noteText);

  // Save the updated notes array to localStorage
  localStorage.setItem("notes", JSON.stringify(notes));

  // Clear the input field and reload the notes
  noteInput.value = "";
  loadNotes();
}

// Function to load and display notes from localStorage
function loadNotes() {
  let notes = JSON.parse(localStorage.getItem("notes")) || [];

  // Clear the current list of notes
  notesList.innerHTML = "";

  // Loop through each note and display it
  notes.forEach((note, index) => {
    const noteElement = document.createElement("div");
    noteElement.classList.add("note");

    // Add the note content and delete button
    noteElement.innerHTML = `
            <p>${note}</p>
            <button class="delete-note" data-index="${index}">Delete</button>
        `;

    // Append the note element to the notes list
    notesList.appendChild(noteElement);
  });

  // Add event listeners to delete buttons
  document.querySelectorAll(".delete-note").forEach((button) => {
    button.addEventListener("click", deleteNote);
  });
}

// Function to delete a note
function deleteNote(event) {
  const index = event.target.getAttribute("data-index");

  // Retrieve notes from localStorage
  let notes = JSON.parse(localStorage.getItem("notes")) || [];

  // Remove the note at the given index
  notes.splice(index, 1);

  // Save the updated notes array to localStorage
  localStorage.setItem("notes", JSON.stringify(notes));

  // Reload the notes
  loadNotes();
}

// Event listener for the search button
searchBtn.addEventListener("click", searchNotes);

// Function to search notes based on the search input
function searchNotes() {
  const searchTerm = searchInput.value.toLowerCase();
  const notes = document.querySelectorAll(".note");

  notes.forEach((note) => {
    const noteText = note.querySelector("p").textContent.toLowerCase();

    // Show only notes that match the search term
    if (noteText.includes(searchTerm)) {
      note.style.display = "block";
    } else {
      note.style.display = "none";
    }
  });
}
