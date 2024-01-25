import globalPathName from "./env/globalParam.js";

import { fetchData, searchAPIData } from "./fetchFunctions.js";

import {
  displayBackgroundImage,
  separeteNumberWithComma,
  convertReleaseDate,
} from "./supportFunctions.js";

//Display 12 top rated Movies
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

//Display 12 top rated TVShows
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

//Display 20 most watched(popular) Movies
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

//Display 20 most watched TVShows
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
  src="images/no-image.jpg"
  class="card-img-top"
  alt="${movieDetail.title}"
  />`
    }
    </div>
    <div class="detail__desc">
      <h2>${movieDetail.title}</h2>
      <p><i class="fas fa-star text-primary"></i> ${movieDetail.vote_average.toFixed(
        1
      )} / 10</p>
      <p class="text__muted"><span class="text-secondary">Release date:</span> ${convertReleaseDate(
        movieDetail.release_date
      )}</p>
      <p>
        ${
          movieDetail.overview
            ? movieDetail.overview
            : "Sorry, but no description found. We will try to fix this issue as soon as possible. Thank you for your understanding."
        }
      </p>
      <h5 class="text-secondary">Starring:</h5>
      <p class="list__group">${movieTeam.cast
        .map(
          (actor) =>
            `<sapn class="bg_secondary_light mg_btm4">${actor.name}</sapn> ("<em>${actor.character}</em>")`
        )
        .join(", ")}</p>
      <h5 class="text-secondary">Director:</h5>
      <p class="list__group">${movieTeam.crew
        .filter((crew) => crew.job === "Director")
        .map((crew) => `<sapn class="bg_secondary_light">${crew.name}</sapn>`)
        .join(", ")}</p>
      <h5 class="text-secondary">Generes:</h5>
      <ul class="list__group">
        ${movieDetail.genres.map((genre) => `<li>${genre.name}</li>`).join("")}
      </ul>
      <a href="${
        movieDetail.homepage
      }" target="_blank" class="btn">Visit Movie Homepage</a>
    </div>
  </div>
  <div class="details__bottom">
    <h2>Movie Info</h2>
    <ul>
      <li><span class="text-secondary">Budget:</span> $${separeteNumberWithComma(
        movieDetail.budget
      )}</li>
      <li><span class="text-secondary">Revenue:</span> $${separeteNumberWithComma(
        movieDetail.revenue
      )}</li>
      <li><span class="text-secondary">Runtime:</span> ${
        movieDetail.runtime
      } minutes</li>
      <li><span class="text-secondary">Staus:</span> ${movieDetail.status}</li>
    </ul>
    <h4 class="text-secondary">Production Companies:</h4>
    <div class="list__group">${movieDetail.production_companies
      .map((company) => `<span>${company.name}</span>`)
      .join(", ")}</div>
  </div>`;

  document.querySelector("#movie__details").appendChild(elemDiv);
}

// Display TVShow details
export async function displayTVShowDetails() {
  const showId = window.location.search.split("=")[1];

  const showDetail = await fetchData(`tv/${showId}`);

  //Display TVShow cast
  const actors = await displayTVShowCast(showId);

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
      <p><i class="fas fa-star text-primary"></i> ${showDetail.vote_average.toFixed(
        1
      )} / 10</p>
      <p class="text__muted"><span class="text-secondary">Last air date:</span> ${convertReleaseDate(
        showDetail.last_air_date
      )}</p>
      <p>
        ${
          showDetail.overview
            ? showDetail.overview
            : "Sorry, but no description found. We will try to fix this issue as soon as possible. Thank you for your understanding."
        }
      </p>
      <h5 class="text-secondary">Cast:</h5>
      <p class="list__group">${actors
        .map(
          (actor) =>
            `<sapn class="bg_secondary_light mg_btm4">${actor.name}</sapn> ("<em>${actor.character}</em>")`
        )
        .join(", ")}</p>
      <h5>Generes</h5>
      <ul class="list__group">
        ${showDetail.genres.map((genre) => `<li>${genre.name}</li>`).join("")}
      </ul>
      <a href="${
        showDetail.homepage
      }" target="_blank" class="btn">Visit Movie Homepage</a>
    </div>
  </div>
  <div class="details__bottom">
    <h2>TV Show Info</h2>
    <ul>
      <li><span class="text-secondary">Episodes:</span> ${
        showDetail.number_of_episodes
      }</li>
      <li><span class="text-secondary">First Episode Air Date:</span> ${convertReleaseDate(
        showDetail.first_air_date
      )}</li>
      <li><span class="text-secondary">Last Episode Air Date:</span> ${convertReleaseDate(
        showDetail.last_air_date
      )}</li>
      <li><span class="text-secondary">Staus:</span> ${showDetail.status}</li>
    </ul>
    <h4 class="text-secondary">Production Companies</h4>
    <div class="list__group">${showDetail.production_companies
      .map((company) => `<span>${company.name}</span>`)
      .join(", ")}</div>
  </div>`;

  document.querySelector("#tv__details").appendChild(elemDiv);
}

// Display media cast in the movie details page
async function displayMovieCast(itemId) {
  const { cast, crew } = await fetchData(`movie/${itemId}/credits`);

  const teamList = {
    cast: cast.slice(0, 10),
    crew: crew.slice(0, 10),
  };

  return teamList;
}

// Display media cast in the tv-show details page
async function displayTVShowCast(itemId) {
  const { cast } = await fetchData(`tv/${itemId}/credits`);

  return cast.slice(0, 10);
}

// Display search results
export function displaySearchResults(results) {
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
      <div class="card-vote">${result.vote_average.toFixed(1)}</div>
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
        ? result.release_date
        : result.first_air_date
    }</span></small>
        </p>
      </div>`;

    document.querySelector(
      "#search-results-heading"
    ).innerHTML = `<div><span>${results.length}</span> of <span>${globalPathName.searchResult.totalResults}</span> Results for <span><em>"${globalPathName.searchResult.term}"</em></span></div>`;

    document.querySelector("#search__content").appendChild(elemDiv);
  });

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
