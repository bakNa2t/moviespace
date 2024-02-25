import globalPathName from "./env/globalParam.js";
import {
  displayNavLinkActive,
  displayLabelCheckedDefault,
  displayToTheTopBtn,
  clickMoveToTheTopBtn,
  displayAlert,
  addTranslateXClass,
  sortByReleaseDateDesc,
  sortByReleaseDateAsc,
  displayLogoBtnBack,
  displayFullYearInFooter,
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

    //Display sorted content for search results by release date descending is clicked on btn
    document
      .querySelector("#sort__results__desc")
      .addEventListener("click", () => {
        //Invoke a function to sort the results
        const sortedResults = sortByReleaseDateDesc(results);
        //Display sorted results
        displaySearchResults(sortedResults);
      });

    //Display sorted content for search results by release date ascending is clicked on btn
    document
      .querySelector("#sort__results__asc")
      .addEventListener("click", () => {
        //Invoke a function to sort the results
        const sortedResults = sortByReleaseDateAsc(results);
        //Display sorted results
        displaySearchResults(sortedResults);
      });

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
      displayLabelCheckedDefault();
      displayTopRatedMovies();
      displayTopRatedTVShoes();
      displayToTheTopBtn();
      clickMoveToTheTopBtn();
      displayLogoBtnBack();
      displayFullYearInFooter();
      break;
    case "/pages/movies.html":
      displayNavLinkActive();
      displayLabelCheckedDefault();
      displayUpcomingMoviesSlider();
      displayMostWatchedMovies();
      displayToTheTopBtn();
      clickMoveToTheTopBtn();
      displayLogoBtnBack();
      displayFullYearInFooter();
      break;
    case "/pages/tv-shows.html":
      displayNavLinkActive();
      displayLabelCheckedDefault();
      displayOnTheAirShowsSlider();
      displayMostWatchedTVShoes();
      displayToTheTopBtn();
      clickMoveToTheTopBtn();
      displayLogoBtnBack();
      displayFullYearInFooter();
      break;
    case "/pages/movie-details.html":
      displayMovieDetails();
      displayLogoBtnBack();
      displayFullYearInFooter();
      break;
    case "/pages/tv-details.html":
      displayTVShowDetails();
      displayLogoBtnBack();
      displayFullYearInFooter();
      break;
    case "/pages/search-result.html":
      searchContent();
      displayLabelCheckedDefault();
      displayToTheTopBtn();
      clickMoveToTheTopBtn();
      displayLogoBtnBack();
      displayFullYearInFooter();
      break;
  }

  addTranslateXClass();
}

document.addEventListener("DOMContentLoaded", init);
