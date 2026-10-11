"use strict";

const form = document.querySelector("#note-form");
const input = document.querySelector("#note-input");
const categorySelect = document.querySelector("#note-category");
const list = document.querySelector("#notes-list");
const count = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");

let notes = [];
let nextId = 1;

function render() {
  list.replaceChildren();

  notes.forEach(note => {
    const li = document.createElement("li");
    li.classList.add("note", `category-${note.category}`);

    const text = document.createElement("p");
    text.classList.add("note-text");
    text.textContent = note.text;

    const details = document.createElement("div");
    details.classList.add("note-details");

    const category = document.createElement("span");
    category.classList.add("category-label");
    category.textContent =
      note.category.charAt(0).toUpperCase() + note.category.slice(1);

    const date = document.createElement("span");
    date.textContent = note.createdAt;

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.classList.add("delete-btn");
    deleteButton.textContent = "Delete";
    deleteButton.setAttribute("aria-label", `Delete note: ${note.text}`);

    deleteButton.addEventListener("click", () => {
      deleteNote(note.id);
    });

    details.append(category, date, deleteButton);
    li.append(text, details);
    list.appendChild(li);
  });

  if (notes.length === 0) {
    count.textContent = "You have no notes yet.";
  } else if (notes.length === 1) {
    count.textContent = "You have 1 note.";
  } else {
    count.textContent = `You have ${notes.length} notes.`;
  }
}

function deleteNote(id) {
  notes = notes.filter(note => note.id !== id);
  render();
}

form.addEventListener("submit", event => {
  event.preventDefault();

  const text = input.value.trim();

  if (text === "") {
    errorMessage.textContent = "Please type a note first.";
    input.setAttribute("aria-invalid", "true");
    input.focus();
    return;
  }

  if (text.length > 200) {
    errorMessage.textContent = "Notes must be 200 characters or fewer.";
    input.setAttribute("aria-invalid", "true");
    input.focus();
    return;
  }

  errorMessage.textContent = "";
  input.removeAttribute("aria-invalid");

  notes.push({
    id: nextId++,
    text: text,
    category: categorySelect.value,
    createdAt: new Date().toLocaleString()
  });

  input.value = "";
  render();
  input.focus();
});

render();