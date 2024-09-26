let gridSize = 16;
let showMenu = false;
let showGridSizeInput = false;
let rainbowColors = false;
let colorsOpacity = false;

const leftArrowFA = "<i class='fa-solid fa-arrow-left'></i>";
const rightArrowFA = "<i class='fa-solid fa-arrow-right'></i>";

const container = document.querySelector("main");
const changeGridSizeInput = document.querySelector("#size");

function generateRandomColour() {
  const r = Math.round(Math.random() * 255);
  const g = Math.round(Math.random() * 255);
  const b = Math.round(Math.random() * 255);

  return `rgba(${r}, ${g}, ${b}, ${colorsOpacity ? .1 : 1})`;
}

function updateAlpha(color) {
  const cleanedString = color.replace("rgba(", "").replace(")", "");
  const splitString = cleanedString.split(",");
  const currentAlpha = splitString.slice(-1)[0];

  if (!colorsOpacity) {
    return `rgba(${splitString[0]}, ${splitString[1]}, ${splitString[2]}, 1`;
  }

  if (parseInt(currentAlpha) >= 1) {
    return;
  }

  const newAlpha = (parseFloat(currentAlpha) + 0.1).toFixed(1);
  return `rgba(${splitString[0]}, ${splitString[1]}, ${splitString[2]}, ${newAlpha}`;
}

function setSlotBackground(event) {
  const currentColor = event.target.style.backgroundColor;

  //? No background color is defined yet
  if (currentColor === "") {
    if (rainbowColors) {
      event.target.style.backgroundColor = generateRandomColour();
    } else {
      event.target.style.backgroundColor = colorsOpacity ? "rgba(97, 97, 97, .1)" : "rgba(97, 97, 97, 1)";
    }
    return;
  }

  //? The current background color is the default grey (no rainbow)
  if (currentColor.startsWith("rgba(97, 97, 97") || currentColor.startsWith("rgb(97, 97, 97")) {
    if (rainbowColors) {
      event.target.style.backgroundColor = generateRandomColour();
    } else if (colorsOpacity) {
      event.target.style.backgroundColor = updateAlpha(currentColor);
    }
    return;
  }

  //? The current background color is a random colour
  if (!rainbowColors && !colorsOpacity) {
    event.target.style.backgroundColor = "rgba(97, 97, 97, 1)";
  } else if (!rainbowColors) {
    event.target.style.backgroundColor = colorsOpacity ? "rgba(97, 97, 97, .1)" : "rgba(97, 97, 97, 1)";
  } else {
    event.target.style.backgroundColor = updateAlpha(currentColor);
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
  const button = document.querySelector("#showButtons");

  if (showMenu) {
    menuDiv.classList.remove("buttons_hidden");
    button.innerHTML = rightArrowFA;
  } else {
    menuDiv.classList.add("buttons_hidden");
    button.innerHTML = leftArrowFA;
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

function toggleRainbowColors(event) {
  rainbowColors = event.target.checked;
}

function toggleColorsOpacity(event) {
  colorsOpacity = event.target.checked;
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

const rainbowToggleCheckbox = document.querySelector("#rainbow");
rainbowToggleCheckbox.addEventListener("click", toggleRainbowColors);

const alphaToggleCheckbox = document.querySelector("#alpha");
alphaToggleCheckbox.addEventListener("click", toggleColorsOpacity);

drawGrid();
