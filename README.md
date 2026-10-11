# QuickNotes

QuickNotes is a browser-based note-taking app built with HTML, CSS and
JavaScript for PLP Project 1. It lets users add, categorise, search and
delete short notes. Notes are saved in localStorage on the current
browser and device.

## Features

- Add notes with Personal, Work or Study categories.
- Display each note's category and creation date.
- Reject empty notes and notes longer than 200 characters.
- Delete individual notes.
- Search note text without case sensitivity.
- Show correct counts for zero, one and multiple notes.
- Keep notes after refreshing the page.
- Use a responsive layout for small screens.
- Display user-entered text safely using textContent.

## How to run locally

1. Clone this repository:
   git clone https://github.com/adenahmedm87/quicknotes-app.git
2. Open the quicknotes-app folder in VS Code.
3. Install the Live Server extension if needed.
4. Right-click index.html and choose Open with Live Server.
5. Keep using the same browser and local address to access saved notes.

No additional packages or build steps are required.

## What I learned

- Semantic HTML describes the purpose of different page areas.
- CSS Flexbox and media queries help arrange content on different screens.
- JavaScript can respond to form submissions and rebuild a list from data.
- JSON.stringify and JSON.parse allow arrays to be saved in localStorage.
- textContent displays user input as text instead of executing it as HTML.

## Storage limitation

Notes are stored locally in the browser. They do not sync between devices,
and clearing browser storage removes them.