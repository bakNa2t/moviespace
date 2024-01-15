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

// Convert data release date to advanced format
export function convertReleaseDate(releaseDate) {
  const data = releaseDate.split("-");
  switch (data[1]) {
    case "01":
      return `${data[0]} Jan ${data[2]}`;
    case "02":
      return `${data[0]} Feb ${data[2]}`;
    case "03":
      return `${data[0]} Mar ${data[2]}`;
    case "04":
      return `${data[0]} Apr ${data[2]}`;
    case "05":
      return `${data[0]} May ${data[2]}`;
    case "06":
      return `${data[0]} Jun ${data[2]}`;
    case "07":
      return `${data[0]} Jul ${data[2]}`;
    case "08":
      return `${data[0]} Aug ${data[2]}`;
    case "09":
      return `${data[0]} Sep ${data[2]}`;
    case "10":
      return `${data[0]} Oct ${data[2]}`;
    case "11":
      return `${data[0]} Nov ${data[2]}`;
    case "12":
      return `${data[0]} Dec ${data[2]}`;
  }
}

// Add translateX class to last child element in the social links
export function addTranslateXClass() {
  const desc = document.querySelectorAll(".desc__modal");

  if (screen.width <= 512) {
    desc[2].classList.add("translateX");
  }
}
