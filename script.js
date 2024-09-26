let gridSize = 16;
let showMenu = false;
let showGridSizeInput = false;

const container = document.querySelector("main");
const changeGridSizeInput = document.querySelector("#size");

function generateRandomColour() {
  const r = Math.round(Math.random() * 255);
  const g = Math.round(Math.random() * 255);
  const b = Math.round(Math.random() * 255);

  return `rgba(${r}, ${g}, ${b}, .1)`;
}

function setSlotBackground(event) {
  if (event.target.style.backgroundColor === "") {
    event.target.style.backgroundColor = generateRandomColour();
  }
}

function drawGrid() {
  container.innerHTML = "";

  for (let i = 0; i < gridSize; i++) {
    const rowDiv = document.createElement("div");
    rowDiv.classList.add("row");

    for (let j = 0; j < gridSize; j++) {
      const slot = document.createElement("div");

      slot.classList.add("slot");
      slot.addEventListener("mouseenter", setSlotBackground);

      rowDiv.appendChild(slot);
    }

    container.appendChild(rowDiv);
  }
}

function toggleMenu() {
  showMenu = !showMenu;
  const menuDiv = document.querySelector(".buttons");

  if (showMenu) {
    menuDiv.classList.remove("buttons_hidden");
  } else {
    menuDiv.classList.add("buttons_hidden");
  }
}

function toggleGridSizeInput() {
  showGridSizeInput = !showGridSizeInput;

  const inputDiv = document.querySelector("#inputDiv");

  if (showGridSizeInput) {
    inputDiv.classList.remove("input_hidden");
  } else {
    inputDiv.classList.add("input_hidden");
  }
}

function changeGridSize() {
  const enteredSize = changeGridSizeInput.value;

  if (
    enteredSize === "" ||
    isNaN(parseInt(enteredSize)) ||
    parseInt(enteredSize) > 100 ||
    parseInt(enteredSize) < 1
  ) {
    changeGridSizeInput.classList.add("invalid_input");
    return;
  }

  changeGridSizeInput.classList.remove("invalid_input");
  gridSize = parseInt(enteredSize);
  drawGrid();
}

const toggleButtonsMenuButton = document.querySelector("#showButtons");
toggleButtonsMenuButton.addEventListener("click", toggleMenu);

const clearGridButton = document.querySelector("#clearGrid");
clearGridButton.addEventListener("click", drawGrid);

const toggleGridSizeInputButton = document.querySelector("#toggleGridSizeInput");
toggleGridSizeInputButton.addEventListener("click", toggleGridSizeInput);

const changeGridSizeButton = document.querySelector("#changeGridSize");
changeGridSizeButton.addEventListener("click", changeGridSize);

changeGridSizeInput.addEventListener("focus", () => changeGridSizeInput.classList.remove("invalid_input"));

drawGrid();
