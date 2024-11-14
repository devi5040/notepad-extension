const notePad = document.querySelector("#notepad");
const body = document.querySelector("body");

body.addEventListener("click", function (event) {
  if (!notePad.contains(event.target)) {
    notePad.classList.add("notepadHide");
  } else {
    notePad.classList.remove("notepadHide");
  }
});

const noteHeader = document.querySelector(".header-title");
let isDragging = false;
let offsetX, offsetY;

noteHeader.addEventListener("mousedown", (e) => {
  isDragging = true;
  offsetX = e.clientX - notePad.offsetLeft;
  offsetY = e.clientY - notePad.offsetTop;
  document.body.style.cursor = "grabbing";
});

noteHeader.addEventListener("mousemove", (e) => {
  if (isDragging) {
    let left = e.clientX - offsetX;
    let top = e.clientY - offsetY;

    //prevent from going  out of screen
    left = Math.max(0, Math.min(window.innerWidth - notePad.offsetWidth, left));
    top = Math.max(0, Math.min(window.innerHeight - notePad.offsetHeight, top));

    notePad.style.left = `${left}px`;
    notePad.style.top = `${top}px`;
  }
});

document.addEventListener("mouseup", () => {
  isDragging = false;
  document.body.style.cursor = "default";
});

//For storing and clearing note from localStorage
const content = localStorage.getItem("notepad") || "";
const notePadContent = document.querySelector("#sticknote");
notePadContent.value = content;
const clearBtn = document.querySelector("#clear-btn");
const saveBtn = document.querySelector("#save-btn");

clearBtn.addEventListener("click", () => {
  notePadContent.value = " ";
  localStorage.setItem("notepad", "");
});
saveBtn.addEventListener("click", () => {
  const value = notePadContent.value;
  localStorage.setItem("notepad", value);
});
