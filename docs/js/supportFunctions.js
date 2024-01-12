// Display spinner
export function displaySpinner() {
  document.querySelector(".spinner").classList.add("show");
}

// Hide spinner
export function hideSpinner() {
  document.querySelector(".spinner").classList.remove("show");
}

// Hide Btn-to-top when scroll
export function displayToTheTopBtn() {
  const toTheTopBtn = document.querySelector(".btn__top");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
      toTheTopBtn.style.opacity = 1;
    } else {
      toTheTopBtn.style.opacity = 0;
    }
  });
}

// Return to the top of the page
export function moveToTheTopBtn() {
  document.body.top = 0;
  document.documentElement.scrollTop = 0;
}

// Add "click" event listeners to move-to-the-top button
export function clickMoveToTheTopBtn() {
  const moveUp = document.querySelector(".btn__top");
  moveUp.addEventListener("click", moveToTheTopBtn);
}

// Separete big numbers with comma
export function separeteNumberWithComma(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Display Alert message of empty search or not found
export function displayAlert(message, className = "alert-error") {
  const alertElement = document.createElement("div");
  alertElement.classList.add("alert", className);
  alertElement.appendChild(document.createTextNode(message));
  document.querySelector("#alert").appendChild(alertElement);

  setTimeout(() => alertElement.remove(), 3000);
}