import globalPathName from "./env/globalParam.js";

// Display spinner
export function displaySpinner() {
  document.querySelector(".spinner").classList.add("show");
}

// Hide spinner
export function hideSpinner() {
  document.querySelector(".spinner").classList.remove("show");
}

// Display message while cannot fetching data
export function displayErrorFetchMessage() {
  document.querySelector(".error__msg").classList.add("display_flex");
}

// Display nav link active after click
export function displayNavLinkActive() {
  const pref = "/pages/";
  const navLinks = document.querySelectorAll(".nav__link");
  navLinks.forEach((link) => {
    if (pref + link.getAttribute("href") === globalPathName.currentPage) {
      link.classList.add("active");
    }
  });
}

// Display backdrop on movie/tv details page
export function displayBackgroundImage(type, backgroundPath) {
  const imageDiv = document.createElement("div");
  const urlBackgroundImg = `https://image.tmdb.org/t/p/original/${backgroundPath}`;

  imageDiv.style.backgroundImage =
    urlBackgroundImg !== "https://image.tmdb.org/t/p/original/null"
      ? `url(https://image.tmdb.org/t/p/original/${backgroundPath})`
      : `url(../images/movie-show-default-bg.jpg)`;
  // imageDiv.classList.add("backdrop");
  imageDiv.style.backgroundSize = "cover";
  imageDiv.style.backgroundPosition = "center";
  imageDiv.style.backgroundRepeat = "no-repeat";
  imageDiv.style.height = "100vh";
  imageDiv.style.width = "100vw";
  imageDiv.style.position = "fixed";
  imageDiv.style.top = "0";
  imageDiv.style.left = "0";
  imageDiv.style.zIndex = "-1";
  imageDiv.style.opacity = "0.35";

  if (type === "movie") {
    document.querySelector("#movie__details").appendChild(imageDiv);
  } else {
    document.querySelector("#tv__details").appendChild(imageDiv);
  }
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

// Add to empty screen 'display: flex' while fetching data
export function addEmptyFlexWhileFetching() {
  document.querySelector("main").classList.add("alert-flex");
}

// Remove from empty screen 'display: flex' while fetching data
export function removeEmptyFlexWhileFetching() {
  document.querySelector("main").classList.remove("alert-flex");
}

// Display active search label if input is checked
export function displayLabelCheckedDefault() {
  const searchInputs = document.querySelectorAll("input[type=radio]");

  searchInputs[0].checked
    ? document.querySelector("label").classList.add("txt_sdw")
    : document.querySelector("label").classList.remove("txt_sdw");

  document.addEventListener("click", () => {
    displayLabelCheckedClicked(searchInputs);
  });
}

// Display active search label if label is clicked
function displayLabelCheckedClicked(obj) {
  const labels = document.querySelectorAll("label");

  if (obj[0].checked) {
    labels.forEach((label) => {
      if (label.getAttribute("for") === "movie") {
        label.classList.add("txt_sdw");
      } else if (label.getAttribute("for") === "tv") {
        label.classList.remove("txt_sdw");
      }
    });
  } else if (obj[1].checked) {
    labels.forEach((label) => {
      if (label.getAttribute("for") === "movie") {
        label.classList.remove("txt_sdw");
      } else if (label.getAttribute("for") === "tv") {
        label.classList.add("txt_sdw");
      }
    });
  }
}

// Hide details posters before loading
export function hideDetailsPosters() {
  document.querySelector(".details__posters").classList.add("d_none");
}

// Show details posters after loading
export function showDetailsPosters() {
  document.querySelector(".details__posters").classList.remove("d_none");
}

// Display sorted content for search results by release date descending
export function sortByReleaseDate(data) {
  return data.sort(
    globalPathName.searchResult.type === "movie"
      ? (a, b) => new Date(b.release_date) - new Date(a.release_date)
      : (a, b) => new Date(b.first_air_date) - new Date(a.first_air_date)
  );
}
