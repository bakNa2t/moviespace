import { fetchData } from "./fetchFunctions.js";
import globalPathName from "./env/globalParam.js";

// Init swiper plugin for movies/tv-shows slider on current page
function initSwiper() {
  const swiper = new Swiper(".swiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    freeMode: true,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    breakpoints: {
      500: {
        slidesPerView: 2,
      },
      700: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 5,
      },
    },
  });
}

// Init swiper plugin for movies/tv-shows poster slider on details pages
function initSwiperPoster() {
  const swiper = new Swiper(".swiper", {
    slidesPerView: 1,
    spaceBetween: 25,
    freeMode: true,
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    breakpoints: {
      500: {
        slidesPerView: 1,
      },
      700: {
        slidesPerView: 2,
      },
      1200: {
        slidesPerView: 3,
      },
      1400: {
        slidesPerView: 4,
      },
    },
  });
}

// Display Slider movies 'What's watching now' (now_playing)
export async function displayNowWatchingMoviesSlider() {
  const { results } = await fetchData("movie/now_playing");

  results.forEach((movie) => {
    const elemDiv = document.createElement("div");
    elemDiv.classList.add("swiper-slide");

    elemDiv.innerHTML = `
      <a href= "${
        globalPathName.currentPage === "/"
          ? `pages/movie-details.html?id=${movie.id}`
          : `movie-details.html?id=${movie.id}`
      }">
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

// Display Slider a list of movies that are being released soon
export async function displayUpcomingMoviesSlider() {
  const { results } = await fetchData("movie/upcoming");

  results.forEach((movie) => {
    const elemDiv = document.createElement("div");
    elemDiv.classList.add("swiper-slide");

    elemDiv.innerHTML = `
      <a href= "${
        globalPathName.currentPage === "/"
          ? `pages/movie-details.html?id=${movie.id}`
          : `movie-details.html?id=${movie.id}`
      }">
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
export async function displayOnTheAirShowsSlider() {
  const { results } = await fetchData("tv/on_the_air");

  results.forEach((show) => {
    const elemDiv = document.createElement("div");
    elemDiv.classList.add("swiper-slide");

    elemDiv.innerHTML = `
      <a href="tv-details.html?id=${show.id}">
        ${
          show.poster_path === null
            ? `<img src="../images/no-image.jpg" alt="${show.name}" />`
            : `<img src="https://image.tmdb.org/t/p/w500${show.poster_path}" alt="${show.name}" />`
        }
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

// A list of movie posters from a certain movie
export async function displayDetailsMoviesPosters() {
  const itemId = window.location.search.split("=")[1];

  const { backdrops } = await fetchData(`movie/${itemId}/images`);

  // console.log(backdrops.length);

  if (backdrops.length > 0) {
    backdrops.forEach((backdrop) => {
      const elemDiv = document.createElement("div");

      elemDiv.classList.add("swiper-slide");

      elemDiv.innerHTML = `<img src="https://image.tmdb.org/t/p/w500${backdrop.file_path}" alt="${backdrop.file_path}" />`;

      document.querySelector(".swiper-wrapper").appendChild(elemDiv);

      initSwiperPoster();
    });
  } else {
    document.querySelector(".details__images").style.display = "none";
  }
}
