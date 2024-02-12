import globalPathName from "./env/globalParam.js";

import { fetchData, searchAPIData } from "./fetchFunctions.js";
import {
  displayDetailsMoviesPosters,
  displayDetailsTVShowPosters,
} from "./swiper.js";
import {
  displaySpinner,
  hideSpinner,
  displayBackgroundImage,
  separeteNumberWithComma,
  convertReleaseDate,
  hideDetailsPosters,
  showDetailsPosters,
} from "./supportFunctions.js";

//Display 12 top rated Movies on the main page
export async function displayTopRatedMovies() {
  const { results } = await fetchData("movie/top_rated");

  results.slice(0, 12).forEach((movie) => {
    const elemDiv = document.createElement("div");
    elemDiv.classList.add("card");
    elemDiv.innerHTML = `
      <a href="pages/movie-details.html?id=${movie.id}">
        ${
          movie.poster_path
            ? `<img
        src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
        class="card-img-top"
        alt="${movie.name}"
      />`
            : `<img
      src="images/no-image.jpg"
      class="card-img-top"
      alt="${movie.name}"
    />`
        }
      </a>
      <div class="card-vote">${movie.vote_average.toFixed(1)}</div>
      <div class="card-body">
        <h5 class="card-title">
          <a href="pages/movie-details.html?id=${movie.id}">${movie.title}</a>
        </h5>
        <p class="card-text">
          <small class="text-muted">Release date: <span>${
            movie.release_date
          }</span></small>
        </p>
      </div>`;

    document.querySelector("#top__rated__movies").appendChild(elemDiv);
  });
}

//Display 12 top rated TVShows on the main page
export async function displayTopRatedTVShoes() {
  const { results } = await fetchData("tv/top_rated");

  results.slice(0, 12).forEach((show) => {
    const elemDiv = document.createElement("div");
    elemDiv.classList.add("card");
    elemDiv.innerHTML = `
      <a href="pages/tv-details.html?id=${show.id}">  
        ${
          show.poster_path
            ? `<img
        src="https://image.tmdb.org/t/p/w500${show.poster_path}"
        class="card-img-top"
        alt="${show.name}"
      />`
            : `<img
      src="images/no-image.jpg"
      class="card-img-top"
      alt="${show.name}"
    />`
        }
      </a>
      <div class="card-vote">${show.vote_average.toFixed(1)}</div>
      <div class="card-body">
        <h5 class="card-title">
          <a href="pages/tv-details.html?id=${show.id}">${show.name}</a>
        </h5>
        <p class="card-text">
          <small class="text-muted">Air date: <span>${
            show.first_air_date
          }</span></small>
        </p>
      </div>`;

    document.querySelector("#top__rated__shows").appendChild(elemDiv);
  });
}

//Display 20 most watched(popular) Movies on the movie page
export async function displayMostWatchedMovies() {
  const { results } = await fetchData("movie/popular");
  // console.log(results);

  results.forEach((movie) => {
    const elemDiv = document.createElement("div");
    elemDiv.classList.add("card");
    elemDiv.innerHTML = `
      <a href="${
        globalPathName.currentPage === "/"
          ? `pages/movie-details.html?id=${movie.id}`
          : `movie-details.html?id=${movie.id}`
      }">
        ${
          movie.poster_path
            ? `<img
        src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
        class="card-img-top"
        alt="${movie.name}"
      />`
            : `<img
      src="../images/no-image.jpg"
      class="card-img-top"
      alt="${movie.name}"
    />`
        }
      </a>
      <div class="card-vote">${movie.vote_average.toFixed(1)}</div>
      <div class="card-body">
        <h5 class="card-title">
          <a href="movie-details.html?id=${movie.id}">${movie.title}</a>
        </h5>
        <p class="card-text">
          <small class="text-muted">Release date: <span>${
            movie.release_date
          }</span></small>
        </p>
      </div>`;

    document.querySelector("#popular__content").appendChild(elemDiv);
  });
}

//Display 20 most watched(popular) TVShows on the tv page
export async function displayMostWatchedTVShoes() {
  const { results } = await fetchData("tv/popular");
  // console.log(results);

  results.forEach((show) => {
    const elemDiv = document.createElement("div");
    elemDiv.classList.add("card");
    elemDiv.innerHTML = `
      <a href="tv-details.html?id=${show.id}">  
        ${
          show.poster_path
            ? `<img
        src="https://image.tmdb.org/t/p/w500${show.poster_path}"
        class="card-img-top"
        alt="${show.name}"
      />`
            : `<img
      src="../images/no-image.jpg"
      class="card-img-top"
      alt="${show.name}"
    />`
        }
      </a>
      <div class="card-vote">${show.vote_average.toFixed(1)}</div>
      <div class="card-body">
        <h5 class="card-title">
          <a href="tv-details.html?id=${show.id}">${show.name}</a>
        </h5>
        <p class="card-text">
          <small class="text-muted">Air date: <span>${
            show.first_air_date
          }</span></small>
        </p>
      </div>`;

    document.querySelector("#popular__tv-content").appendChild(elemDiv);
  });
}

// Display Movies details
export async function displayMovieDetails() {
  const movieId = window.location.search.split("=")[1];

  hideDetailsPosters();
  displaySpinner();

  const movieDetail = await fetchData(`movie/${movieId}`);
  //Display movie cast
  const movieTeam = await displayMovieCast(movieId);

  // Background movie image as overlay
  displayBackgroundImage("movie", movieDetail.backdrop_path);

  const elemDiv = document.createElement("div");

  elemDiv.innerHTML = `<div class="details__top">
    <div>
    ${
      movieDetail.poster_path
        ? `<img
    src="https://image.tmdb.org/t/p/w400${movieDetail.poster_path}"
    class="card-img-top"
    alt="${movieDetail.title}"
  />`
        : `<img
  src="../images/no-image.jpg"
  class="card-img-top"
  alt="${movieDetail.title}"
  />`
    }
    </div>
    <div class="detail__desc">
      <h2>${movieDetail.title}</h2>
      <p><i class="fas fa-star text-primary"></i> ${
        movieDetail.vote_average > 0
          ? `${movieDetail.vote_average.toFixed(1)} / 10`
          : movieDetail.vote_average
      } ${
    movieDetail.vote_count
      ? `<span class="font_12">(<em class="text-secondary"> ${movieDetail.vote_count}</em> votes)</span>`
      : `<span class="font_12">(<em>no votes</em>)</span>`
  }
      </p>
      <p class="text__muted"><span class="text-secondary">Release date:</span> ${
        movieDetail.release_date
          ? convertReleaseDate(movieDetail.release_date)
          : `<span class="bg_secondary_light">N/A</span>`
      }</p>
      <p>
        ${
          movieDetail.overview
            ? movieDetail.overview
            : "Sorry, but no description found. We will try to fix this issue as soon as possible. Thank you for your understanding."
        }
      </p>
      <h5 class="text-secondary">Starring:</h5>
      <p class="list__group">${
        movieTeam.cast.length > 0
          ? movieTeam.cast
              .map(
                (actor) =>
                  `<span class="bg_secondary_light mg_btm4">${
                    actor.name
                  }</span> <em>("${
                    actor.character.length > 0 && actor.character !== ""
                      ? actor.character
                      : "N/A"
                  }")</em>`
              )
              .join(", ")
          : `<span class="bg_secondary_light">N/A</span>`
      }</p>
      <h5 class="text-secondary">Directed by:</h5>
      <p class="list__group">${
        movieTeam.crew.length > 0
          ? movieTeam.crew
              .filter((crew) => crew.job === "Director")
              .map(
                (crew) => `<sapn class="bg_secondary_light">${crew.name}</sapn>`
              )
              .join(", ")
          : `<span class="bg_secondary_light">N/A</span>`
      }</p>
      <h5 class="text-secondary">Generes:</h5>
      <ul class="list__group">
        ${
          movieDetail.genres.length > 0
            ? movieDetail.genres
                .map((genre) => `<li>${genre.name}</li>`)
                .join("")
            : `<li>N/A</li>`
        }
      </ul>
      <a href="${
        movieDetail.homepage
      }" target="_blank" class="btn btn__pulse">Visit Movie Homepage</a>
    </div>
  </div>
  <div class="details__bottom">
    <h2>Movie Info</h2>
    <ul>
      <li><span class="text-secondary">Budget:</span> ${
        movieDetail.budget > 0
          ? `$${separeteNumberWithComma(movieDetail.budget)}`
          : `N/A`
      }</li>
      <li><span class="text-secondary">Revenue:</span> ${
        movieDetail.revenue > 0
          ? `$${separeteNumberWithComma(movieDetail.revenue)}`
          : `N/A`
      }</li>
      <li><span class="text-secondary">Runtime:</span> ${
        movieDetail.runtime > 0 ? `${movieDetail.runtime} minutes` : "N/A"
      }</li>
      <li><span class="text-secondary">Staus:</span> ${
        movieDetail.status ? movieDetail.status : "N/A"
      }</li>
    </ul>
    <h4 class="text-secondary">Production Countries:</h4>
    <div class="list__group mg_btm4">${
      movieDetail.production_countries.length > 0
        ? movieDetail.production_countries
            .map(
              (country) =>
                `<span class="bg_secondary_light mg_btm4">${country.name}</span>`
            )
            .join(", ")
        : `<span class="bg_secondary_light mg_btm4">N/A</span>`
    }</div>
    <h4 class="text-secondary">Production Companies:</h4>
    <div class="list__group">${
      movieDetail.production_companies.length > 0
        ? movieDetail.production_companies
            .map(
              (company) =>
                `<span class="bg_secondary_light mg_btm4">${company.name}</span>`
            )
            .join(", ")
        : `<span class="bg_secondary_light mg_btm4">N/A</span>`
    }</div>
  </div>`;

  document.querySelector("#movie__details").appendChild(elemDiv);

  hideSpinner();
  showDetailsPosters();
  displayDetailsMoviesPosters();

  document.querySelector(
    "title"
  ).innerHTML = `MovieSpace | ${movieDetail.title} - Movie Details`;
}

// Display TVShow details
export async function displayTVShowDetails() {
  const showId = window.location.search.split("=")[1];

  displaySpinner();
  hideDetailsPosters();

  const showDetail = await fetchData(`tv/${showId}`);
  //Display TVShow cast
  const showTeam = await displayTVShowCast(showId);

  // Background movie image as overlay
  displayBackgroundImage("tv", showDetail.backdrop_path);

  const elemDiv = document.createElement("div");

  elemDiv.innerHTML = `<div class="details__top">
    <div>
    ${
      showDetail.poster_path
        ? `<img
    src="https://image.tmdb.org/t/p/w500${showDetail.poster_path}"
    class="card-img-top"
    alt="${showDetail.name}"
  />`
        : `<img
  src="../images/no-image.jpg"
  class="card-img-top"
  alt="${showDetail.name}"
  />`
    }
    </div>
    <div class="detail__desc">
      <h2>${showDetail.name}</h2>
      <p><i class="fas fa-star text-primary"></i> ${
        showDetail.vote_average > 0
          ? `${showDetail.vote_average.toFixed(1)} / 10`
          : showDetail.vote_average
      } 
        ${
          showDetail.vote_count
            ? `<span class="font_12">(<em class="text-secondary">${showDetail.vote_count}</em> votes)</span>`
            : `<span class="font_12">(<em>no votes</em>)</span>`
        }
      </p>
      <p>
        ${
          showDetail.overview
            ? showDetail.overview
            : "Sorry, but no description found. We will try to fix this issue as soon as possible. Thank you for your understanding."
        }
      </p>
      <h5 class="text-secondary">Starring:</h5>
      <p class="list__group">${showTeam.cast
        .map(
          (actor) =>
            `<span class="bg_secondary_light mg_btm4">${
              actor.name
            }</span> <em>("${
              actor.character !== "" ? actor.character : "N/A"
            }")</em>`
        )
        .join(", ")}</p>
      <h5 class="text-secondary">Creators:</h5>
      <p class="list__group">${
        showTeam.crew.length > 0
          ? `${showTeam.crew
              .filter((crew) => crew.job === "Executive Producer")
              .map(
                (crew) =>
                  `<span class="bg_secondary_light mg_btm4">${crew.name}</span>`
              )
              .join(", ")}`
          : `<span class="bg_secondary_light">N/A</span>`
      }</p>
      <h5 class="text-secondary">Genres</h5>
      <ul class="list__group">
      ${
        showDetail.genres.length > 0
          ? showDetail.genres.map((genre) => `<li>${genre.name}</li>`).join("")
          : `<li>N/A</li>`
      }
      </ul>
      <a href="${
        showDetail.homepage
      }" target="_blank" class="btn btn__pulse">Visit Movie Homepage</a>
    </div>
  </div>
  <div class="details__bottom">
    <h2>TV Show Info</h2>
    <ul>
      <li><span class="text-secondary">Episodes:</span>${
        showDetail.number_of_episodes
          ? `${showDetail.number_of_episodes}`
          : "N/A"
      }</li>
      <li><span class="text-secondary">Number of seasons:</span> ${
        showDetail.number_of_seasons ? `${showDetail.number_of_seasons}` : "N/A"
      }</li>
      <li><span class="text-secondary">First Episode Air Date:</span> ${
        showDetail.first_air_date
          ? `${convertReleaseDate(showDetail.first_air_date)}`
          : "N/A"
      }</li>
      <li><span class="text-secondary">Last Episode Air Date:</span> ${
        showDetail.last_air_date
          ? `${convertReleaseDate(showDetail.last_air_date)}`
          : "N/A"
      }</li>
      <li><span class="text-secondary">Staus:</span> ${
        showDetail.status ? showDetail.status : "N/A"
      }</li>
    </ul>
    <h4 class="text-secondary">Production Countries:</h4>
    <div class="list__group mg_btm4">${
      showDetail.production_countries.length > 0
        ? showDetail.production_countries
            .map(
              (country) =>
                `<span class="bg_secondary_light mg_btm4">${country.name}</span>`
            )
            .join(", ")
        : `<span class="bg_secondary_light mg_btm4">N/A</span>`
    }</div>
    <h4 class="text-secondary">Production Companies</h4>
    <div class="list__group">${
      showDetail.production_companies.length > 0
        ? showDetail.production_companies
            .map(
              (company) =>
                `<span class="bg_secondary_light mg_btm4">${company.name}</span>`
            )
            .join(", ")
        : `<span class="bg_secondary_light mg_btm4">N/A</span>`
    }</div>
  </div>`;

  document.querySelector("#tv__details").appendChild(elemDiv);

  hideSpinner();
  showDetailsPosters();
  displayDetailsTVShowPosters();

  document.querySelector(
    "title"
  ).innerHTML = `MovieSpace | ${showDetail.name} - TV Show Details`;
}

// Display media cast in the movie details page
async function displayMovieCast(itemId) {
  const { cast, crew } = await fetchData(`movie/${itemId}/credits`);

  const teamList = {
    cast: cast.slice(0, 10),
    crew: crew,
  };

  return teamList;
}

// Display media cast in the tv-show details page
async function displayTVShowCast(itemId) {
  const { cast, crew } = await fetchData(`tv/${itemId}/credits`);

  const teamList = {
    cast: cast.slice(0, 10),
    crew: crew,
  };

  return teamList;
}

// Display search results
export function displaySearchResults(results) {
  const pgnUp = document.querySelector("#pagination__top");
  const pgnDown = document.querySelector("#pagination__bottom");
  const resultGrid = document.querySelector("#search__content");
  const wrapper = document.querySelector(".wrapper");
  const sortNav = document.querySelector(".wrapper__sort__btn");

  // Clear previous results
  document.querySelector("#search__content").innerHTML = "";
  document.querySelector("#search-results-heading").innerHTML = "";
  document.querySelector("#pagination__top").innerHTML = "";
  document.querySelector("#pagination__bottom").innerHTML = "";

  results.forEach((result) => {
    const elemDiv = document.createElement("div");
    elemDiv.classList.add("card");
    elemDiv.innerHTML = `
      <a href="${globalPathName.searchResult.type}-details.html?id=${
      result.id
    }">
        ${
          result.poster_path
            ? `<img
        src="https://image.tmdb.org/t/p/w500/${result.poster_path}"
        class="card-img-top"
        alt="${
          globalPathName.searchResult.type === "movie"
            ? result.title
            : result.name
        }"
      />`
            : `<img
      src="../images/no-image.jpg"
      class="card-img-top"
      alt="${
        globalPathName.searchResult.type === "movie"
          ? result.title
          : result.name
      }"
    />`
        }
      </a>
      <div class="card-vote">${
        result.vote_average > 0
          ? result.vote_average.toFixed(1)
          : result.vote_average
      }</div>
      <div class="card-body">
        <h5 class="card-title"><a href="${
          globalPathName.searchResult.type
        }-details.html?id=${result.id}">
        ${
          globalPathName.searchResult.type === "movie"
            ? result.title
            : result.name
        }</a>
        </h5>
        <p class="card-text">
          <small class="text-muted">${
            globalPathName.searchResult.type === "movie"
              ? "Release date"
              : "First air date"
          }: <span>${
      globalPathName.searchResult.type === "movie"
        ? `${result.release_date ? result.release_date : "N/A"}`
        : `${result.first_air_date ? result.first_air_date : "N/A"}`
    }</span></small>
        </p>
      </div>`;

    document.querySelector("#search-results-heading").innerHTML = `<div><span>${
      results.length
    }</span> of <span>${
      globalPathName.searchResult.totalResults
    }</span> Results for <span><em>"${
      globalPathName.searchResult.term
    }"</em></span>${
      results.length > 1
        ? `${
            globalPathName.searchResult.type === "movie"
              ? "&nbsp; in Movies"
              : "&nbsp; in TV Shows"
          }`
        : `${
            globalPathName.searchResult.type === "movie"
              ? "&nbsp; in Movie"
              : "&nbsp; in TV Show"
          }`
    }</div>`;

    document.querySelector("#search__content").appendChild(elemDiv);
  });

  //Display sort nav
  sortNav.classList.add("d_flex");

  // Hide pagination block if there is less than 20 results and one page
  if (results.length < 20) {
    // Hide pagination block if there is only one page and one result
    if (results.length < 2 && screen.width > 768) {
      document.querySelector(".card").classList.add("grid_elm_center");
      sortNav.classList.remove("d_flex");
    } else if (results.length < 3 && screen.width > 768) {
      resultGrid.classList.add("grid_pdg_h_295");
      sortNav.classList.remove("d_flex");
    } else if (results.length < 4 && screen.width > 768) {
      resultGrid.classList.add("grid_pdg_h_80");
      sortNav.classList.remove("d_flex");
    }

    //Hide pagination nav
    pgnUp.classList.add("d_none");
    pgnDown.classList.add("d_none");

    //Move sort nav to the right
    wrapper.style.justifyContent = "end";
    wrapper.style.marginBottom = "20px";
  }

  displayPagination();
}

//Create pagination block and display it for search results
function displayPagination() {
  const elemDivTop = document.createElement("div");
  const elemDivBot = document.createElement("div");

  elemDivTop.classList.add("pagination", "mg_btm20");
  elemDivBot.classList.add("pagination");

  elemDivTop.innerHTML = `
    <button class="btn btn-primary" id="prev__top">Prev</button>
    <button class="btn btn-primary" id="next__top">Next</button>
    <div class="page__counter">Page ${globalPathName.searchResult.page} of ${globalPathName.searchResult.totalPages}</div>
    `;
  elemDivBot.innerHTML = `
    <button class="btn btn-primary" id="prev__bot">Prev</button>
    <button class="btn btn-primary" id="next__bot">Next</button>
    <div class="page__counter">Page ${globalPathName.searchResult.page} of ${globalPathName.searchResult.totalPages}</div>
    `;

  document.querySelector("#pagination__top").appendChild(elemDivTop);
  document.querySelector("#pagination__bottom").appendChild(elemDivBot);

  //Disable prev__top and prev__bot buttons if current page is first page
  if (globalPathName.searchResult.page === 1) {
    document.querySelector("#prev__top").disabled = true;
    document.querySelector("#prev__bot").disabled = true;
  }

  //Disable next__top and next__bot button if current page is last page
  if (
    globalPathName.searchResult.page === globalPathName.searchResult.totalPages
  ) {
    document.querySelector("#next__top").disabled = true;
    document.querySelector("#next__bot").disabled = true;
  }

  // Add event listeners to "next__top" button to change pages at the top of the search results
  document.querySelector("#next__top").addEventListener("click", async () => {
    globalPathName.searchResult.page++;

    const { results, total_pages } = await searchAPIData();
    displaySearchResults(results);
  });

  // Add event listeners to "next__bot" button to change pages at the bottom of the search results
  document.querySelector("#next__bot").addEventListener("click", async () => {
    globalPathName.searchResult.page++;

    const { results, total_pages } = await searchAPIData();
    displaySearchResults(results);
  });

  // Add event listeners to "prev__top" button to change pages at the top of the search results
  document.querySelector("#prev__top").addEventListener("click", async () => {
    globalPathName.searchResult.page--;

    const { results, total_pages } = await searchAPIData();
    displaySearchResults(results);
  });

  // Add event listeners to "prev__bot" button to change pages at the bottom of the search results
  document.querySelector("#prev__bot").addEventListener("click", async () => {
    globalPathName.searchResult.page--;

    const { results, total_pages } = await searchAPIData();
    displaySearchResults(results);
  });
}
