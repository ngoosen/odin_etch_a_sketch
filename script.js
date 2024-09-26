let gridSize = 16;
let showMenu = false;
let showGridSizeInput = false;

const container = document.querySelector("main");

function setSlotBackground(event) {
  event.target.classList.add("slot_hovered");
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

const toggleButtonsMenuButton = document.querySelector("#showButtons");
toggleButtonsMenuButton.addEventListener("click", toggleMenu);

const clearGridButton = document.querySelector("#clearGrid");
clearGridButton.addEventListener("click", drawGrid);

const toggleGridSizeInputButton = document.querySelector("#toggleGridSizeInput");
toggleGridSizeInputButton.addEventListener("click", toggleGridSizeInput);

drawGrid();
