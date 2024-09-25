let gridSize = 16;

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

drawGrid();
