import { displayPopularContentPopupTrailer } from "./displayFunctions.js";
import { displayPopup, hidePopup } from "./supportFunctions.js";

// Init trailer popup event listeners for movies/tv-shows in array
export function initPopupEventListenersInArray(term, selector) {
  // Click on play icon to display popup with trailer
  document.querySelectorAll(selector).forEach((item) => {
    item.addEventListener("click", async () => {
      const id = item.nextElementSibling.getAttribute("href").split("=")[1];

      await displayPopularContentPopupTrailer(term, id);
      displayPopup();
    });
  });
  // Close popup modal when clicked on backdrop
  document.querySelector(".popup").addEventListener("click", (e) => {
    if (e.target === document.getElementById("popup__trailer")) hidePopup();
  });
  // Close popup modal when clicked on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") hidePopup();
  });
}

// Init trailer popup event listeners for details page
export function initPopupEventListenersInDetails() {
  document.querySelector(".fa-regular").addEventListener("click", displayPopup);
  document.querySelector(".close").addEventListener("click", hidePopup);
  document.addEventListener("click", (e) => {
    if (e.target.id === "popup__trailer") {
      hidePopup();
    }
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      hidePopup();
    }
  });
}

// Init card short description popup event listeners for movies/tv-shows cards
export function initCardPopupEventListeners() {
  document.querySelectorAll(".card__vote").forEach((item) => {
    item.addEventListener("mouseenter", (e) => {
      const desc = e.target.nextElementSibling;
      desc.classList.add("d_flex");
    });
    item.addEventListener("mouseleave", (e) => {
      const desc = e.target.nextElementSibling;
      desc.classList.remove("d_flex");
    });
  });
}
