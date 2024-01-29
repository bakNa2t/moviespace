import globalPathName from "./env/globalParam.js";
import {
  displayNavLinkActive,
  displayLabelChecked,
  displayToTheTopBtn,
  clickMoveToTheTopBtn,
  displayAlert,
  addTranslateXClass,
} from "./supportFunctions.js";
import { searchAPIData } from "./fetchFunctions.js";
import {
  displayTopRatedMovies,
  displayTopRatedTVShoes,
  displayMostWatchedMovies,
  displayMostWatchedTVShoes,
  displayMovieDetails,
  displayTVShowDetails,
  displaySearchResults,
} from "./displayFunctions.js";
import {
  displayNowWatchingMoviesSlider,
  displayUpcomingMoviesSlider,
  displayOnTheAirShowsSlider,
} from "./swiper.js"; //Sliding with swiper

// Display Searching movie/tv results
async function searchContent() {
  const queryStr = window.location.search;
  const urlParametrs = new URLSearchParams(queryStr);

  globalPathName.searchResult.type = urlParametrs.get("type");
  globalPathName.searchResult.term = urlParametrs.get("search__term");

  if (
    globalPathName.searchResult.term !== "" &&
    globalPathName.searchResult.term !== null
  ) {
    const { results, total_pages, page, total_results } = await searchAPIData();

    globalPathName.searchResult.page = page;
    globalPathName.searchResult.totalPages = total_pages;
    globalPathName.searchResult.totalResults = total_results;

    if (results.length === 0) {
      displayAlert("No results found");
      document.querySelector("main").classList.add("alert-flex");
      return;
    }

    displaySearchResults(results);

    document.querySelector("#search__term").value = "";
  } else {
    displayAlert("Please enter search term");
    document.querySelector("main").classList.add("alert-flex");
  }
}

//Initialize App with routes
function init() {
  switch (globalPathName.currentPage) {
    case "/":
      displayNowWatchingMoviesSlider();
      displayLabelChecked();
      displayTopRatedMovies();
      displayTopRatedTVShoes();
      displayToTheTopBtn();
      clickMoveToTheTopBtn();
      break;
    case "/pages/movies.html":
      displayNavLinkActive();
      displayUpcomingMoviesSlider();
      displayMostWatchedMovies();
      displayToTheTopBtn();
      clickMoveToTheTopBtn();
      break;
    case "/pages/tv-shows.html":
      displayNavLinkActive();
      displayOnTheAirShowsSlider();
      displayMostWatchedTVShoes();
      displayToTheTopBtn();
      clickMoveToTheTopBtn();
      break;
    case "/pages/movie-details.html":
      displayMovieDetails();
      break;
    case "/pages/tv-details.html":
      displayTVShowDetails();
      break;
    case "/pages/search-result.html":
      searchContent();
      displayToTheTopBtn();
      clickMoveToTheTopBtn();
      break;
  }

  addTranslateXClass();
}

document.addEventListener("DOMContentLoaded", init);
