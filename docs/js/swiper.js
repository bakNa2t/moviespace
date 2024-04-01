import { fetchData } from "./fetchFunctions.js";
import globalPathName from "./env/globalParam.js";
import {
  addPopupPosterImg,
  showPosterPopup,
  hidePosterPopup,
} from "./supportFunctions.js";
import { initPopupEventListenersInArray } from "./elemEventListenersFunctions.js";

// Init swiper plugin for movies/tv-shows slider on current page
function initSwiper() {
  const swiper = new Swiper(".swiper", {
    slidesPerView: 1,
    spaceBetween: 25,
    freeMode: true,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    breakpoints: {
      500: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      700: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      1200: {
        slidesPerView: 5,
      },
      1900: {
        slidesPerView: 7,
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
      <i class="fa-regular fa-circle-play"></i>
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

    // Dispaly/hide popup trailer for main page
    initPopupEventListenersInArray("movie", ".fa-circle-play");
  });
}

// Display Slider a list of movies that are being released soon
export async function displayUpcomingMoviesSlider() {
  const { results } = await fetchData("movie/upcoming");

  results.forEach((movie) => {
    const elemDiv = document.createElement("div");
    elemDiv.classList.add("swiper-slide");

    elemDiv.innerHTML = `
      <i class="fa-regular fa-circle-play"></i>
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

    // Dispaly/hide popup trailer for main page
    initPopupEventListenersInArray("movie", ".fa-circle-play");
  });
}

//A list of TV shows that air in the next 7 days
export async function displayOnTheAirShowsSlider() {
  const { results } = await fetchData("tv/on_the_air");

  results.forEach((show) => {
    const elemDiv = document.createElement("div");
    elemDiv.classList.add("swiper-slide");

    elemDiv.innerHTML = `
      <i class="fa-regular fa-circle-play"></i>
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

    // Dispaly/hide popup trailer for main page
    initPopupEventListenersInArray("tv", ".fa-circle-play");
  });
}

// A list of movie posters from a certain movie
export async function displayDetailsContentPosters(term, itemId) {
  const { backdrops } = await fetchData(`${term}/${itemId}/images`);

  if (backdrops.length > 0) {
    backdrops.forEach((poster) => {
      const elemDiv = document.createElement("div");

      elemDiv.classList.add("swiper-slide");

      elemDiv.innerHTML = `<img src="https://image.tmdb.org/t/p/w500${poster.file_path}" alt="${itemId} ${poster.file_path}" />`;

      document.querySelector(".swiper-wrapper").appendChild(elemDiv);

      initSwiperPoster();

      // Get src attribute from img element and display it in modal
      document.querySelectorAll(".swiper-slide img").forEach((img) => {
        img.addEventListener("click", () => {
          const src = img.getAttribute("src");
          showPosterPopup();
          addPopupPosterImg(src);
        });
      });
      // Close popup modal when clicked outside
      document
        .querySelector("#popup__poster__img")
        .addEventListener("click", (e) => {
          if (e.target === document.querySelector("#popup__poster__img"))
            hidePosterPopup();
        });
      // Close popup modal when pressed on ESC key
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          hidePosterPopup();
        }
      });
    });
  } else {
    document.querySelector(".details__posters").style.display = "none";
  }
}
