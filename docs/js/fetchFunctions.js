import globalPathName from "./env/globalParam.js";
import {
  addEmptyFlexWhileFetching,
  removeEmptyFlexWhileFetching,
  displaySpinner,
  hideSpinner,
  displayErrorFetchMessage,
} from "./supportFunctions.js";

// Fetch data from TMDB API with param as endPoint
export async function fetchData(endPoint) {
  const API_KEY = globalPathName.api.apiKey;
  const API_URL = globalPathName.api.apiUrl;

  try {
    displaySpinner();
    addEmptyFlexWhileFetching();

    const response = await fetch(`${API_URL}${endPoint}?api_key=${API_KEY}`);

    const data = await response.json();

    removeEmptyFlexWhileFetching();
    hideSpinner();

    return data;
  } catch (error) {
    displayErrorFetchMessage();
  }
}

// Send request to TMDB API with search term and type
export async function searchAPIData() {
  const API_KEY = globalPathName.api.apiKey;
  const API_URL = globalPathName.api.apiUrl;

  displaySpinner();
  addEmptyFlexWhileFetching();

  const response = await fetch(
    `${API_URL}search/${globalPathName.searchResult.type}?api_key=${API_KEY}&language=en-US&query=${globalPathName.searchResult.term}&page=${globalPathName.searchResult.page}`
  );

  const data = await response.json();

  removeEmptyFlexWhileFetching();
  hideSpinner();

  return data;
}
