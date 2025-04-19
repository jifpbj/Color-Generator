const colorContainer = document.getElementById("color-container");
const infoContainer = document.getElementById("container-info");
const form = document.getElementById("color-form");

form.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent the form from submitting

  const colorPicker = document
    .getElementById("colorPicker")
    .value.replace(/#\b/g, "");
  const colorCombo = document.getElementById("color-combination").value;
  console.log("Color Picker Value:", colorPicker);
  fetch(
    `https://www.thecolorapi.com/scheme?hex=${colorPicker}&mode=${colorCombo}&count=5`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log("Color Data:", data.colors);
      const colorsArr = data.colors.map((color) => color.hex.clean);
      console.log("Cleaned Colors:", colorsArr);
      renderColors(colorsArr);
    })
    .catch((error) => {
      console.error("Error fetching color data:", error);
    });
});

function renderColors(colorsArr) {
  colorContainer.innerHTML = ""; // Clear previous colors
  infoContainer.innerHTML = ""; // Clear previous info
  colorsArr.forEach((color) => {
    const index = colorsArr.indexOf(color) + 1;
    const colorDiv = document.createElement("div");
    colorDiv.className = `color-box color${index}`;
    colorDiv.id = `color${index}`;
    colorDiv.style.backgroundColor = `#${color}`;
    colorDiv.innerText = `#${color}`;
    colorContainer.appendChild(colorDiv);
    infoContainer.innerHTML += `<div class="color-info" id="color-info-${index}">#${color}</div>`;
  });
}

colorContainer.addEventListener("click", function (event) {
  const target = event.target;
  if (target.classList.contains("color-box")) {
    const colorValue = target.innerText;
    navigator.clipboard.writeText(colorValue).then(() => {
      alert(`Color ${colorValue} copied to clipboard!`);
    });
  }
});

infoContainer.addEventListener("click", function (event) {
  const target = event.target;
  if (target.classList.contains("color-info")) {
    const colorValue = target.innerText;
    navigator.clipboard.writeText(colorValue).then(() => {
      alert(`Color ${colorValue} copied to clipboard!`);
    });
  }
});
