import apiAccessToken from "./api.js";

const globalPathName = {
  currentPage: window.location.pathname,
  searchResult: {
    term: "",
    type: "",
    page: 1,
    totalPages: 0,
    totalResults: 0,
  },
  api: {
    apiKey: apiAccessToken,
    apiUrl: "https://api.themoviedb.org/3/",
  },
};

export default globalPathName;
