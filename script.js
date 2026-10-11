"use strict";

const form = document.querySelector("#note-form");
const input = document.querySelector("#note-input");
const categorySelect = document.querySelector("#note-category");
const searchInput = document.querySelector("#search-input");
const list = document.querySelector("#notes-list");
const count = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");

const STORAGE_KEY = "aden-quicknotes-project1";
const CATEGORIES = ["personal", "work", "study"];

let notes = loadNotes();
let nextId = notes.reduce(
  (largest, note) => Math.max(largest, note.id + 1),
  Date.now()
);

function loadNotes() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === null) return [];

    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed)) return [];

    return parsed.filter((note) =>
      note !== null &&
      typeof note === "object" &&
      Number.isSafeInteger(note.id) &&
      typeof note.text === "string" &&
      CATEGORIES.includes(note.category) &&
      typeof note.createdAt === "string"
    );
  } catch {
    errorMessage.textContent =
      "Saved notes could not be loaded. Check your browser storage settings.";
    return [];
  }
}

function saveNotes() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  } catch {
    errorMessage.textContent =
      "Notes work for this session, but could not be saved in this browser.";
  }
}

function render() {
  list.replaceChildren();

  const search = searchInput.value.trim().toLowerCase();
  const visibleNotes = notes.filter((note) =>
    note.text.toLowerCase().includes(search)
  );

  visibleNotes.forEach((note) => {
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
    deleteButton.addEventListener("click", () => deleteNote(note.id));

    details.append(category, date, deleteButton);
    li.append(text, details);
    list.appendChild(li);
  });

  if (search !== "" && visibleNotes.length === 0) {
    const message = document.createElement("li");
    message.textContent = "No notes match your search.";
    list.appendChild(message);
  }

  count.textContent =
    notes.length === 0
      ? "You have no notes yet."
      : notes.length === 1
        ? "You have 1 note."
        : `You have ${notes.length} notes.`;
}

function deleteNote(id) {
  notes = notes.filter((note) => note.id !== id);
  saveNotes();
  render();
}

form.addEventListener("submit", (event) => {
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

  if (!CATEGORIES.includes(categorySelect.value)) {
    errorMessage.textContent = "Please choose Personal, Work or Study.";
    return;
  }

  errorMessage.textContent = "";
  input.removeAttribute("aria-invalid");

  notes.push({
    id: nextId++,
    text,
    category: categorySelect.value,
    createdAt: new Date().toLocaleString()
  });

  saveNotes();
  input.value = "";
  render();
  input.focus();
});

searchInput.addEventListener("input", render);

render();