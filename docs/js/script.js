import globalPathName from "./globalParam.js";
import {
  displayNavLinkActive,
  displayToTheTopBtn,
  clickMoveToTheTopBtn,
  displayAlert,
  addTranslateXClass,
} from "./supportFunctions.js";
import { fetchData, searchAPIData } from "./fetchFunctions.js";
import {
  displayMostWatchedMovies,
  displayMostWatchedTVShoes,
  displayMovieDetails,
  displayTVShowDetails,
  displaySearchResults,
} from "./displayFunctions.js";
import { initSwiper } from "./swiper.js"; //Sliding with swiper

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

// Display Slider movies 'What's watching now'
async function displayNowWatchingMoviesSlider() {
  const { results } = await fetchData("movie/now_playing");

  results.forEach((movie) => {
    const elemDiv = document.createElement("div");
    elemDiv.classList.add("swiper-slide");

    elemDiv.innerHTML = `
      <a href="pages/movie-details.html?id=${movie.id}">
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${
      movie.title
    }" />
      </a>
      <h4 class="swiper__rating">
        <i class="fas fa-star text-secondary"> ${movie.vote_average.toFixed(
          1
        )} / 10</i>
      </h4>
      `;

    document.querySelector(".swiper-wrapper").appendChild(elemDiv);

    initSwiper();
  });
}

//A list of TV shows that air in the next 7 days
async function displayOnTheAirShowsSlider() {
  const { results } = await fetchData("tv/on_the_air");

  results.forEach((show) => {
    const elemDiv = document.createElement("div");
    elemDiv.classList.add("swiper-slide");

    elemDiv.innerHTML = `
      <a href="tv-details.html?id=${show.id}">
        <img src="https://image.tmdb.org/t/p/w500${show.poster_path}" alt="${
      show.name
    }" />
      </a>
      <h4 class="swiper__rating">
        <i class="fas fa-star text-secondary"> ${show.vote_average.toFixed(
          1
        )} / 10</i>
      </h4>
      `;

    document.querySelector(".swiper-wrapper").appendChild(elemDiv);

    initSwiper();
  });
}

//Initialize App with routes
function init() {
  switch (globalPathName.currentPage) {
    case "/":
    case "/index.html":
      displayNowWatchingMoviesSlider();
      displayMostWatchedMovies();
      displayToTheTopBtn();
      clickMoveToTheTopBtn();
      break;
    case "/pages/tv-shows.html":
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

  displayNavLinkActive();
  addTranslateXClass();
}

document.addEventListener("DOMContentLoaded", init);
