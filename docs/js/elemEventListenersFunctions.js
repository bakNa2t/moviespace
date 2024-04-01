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
