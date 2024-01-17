const URL_PREFIX = "https://api.themoviedb.org/3";
export const API_KEY = "305c1f113377a22dbb322569c5ff54df";

// for high quality images
export const IMG_URL_PREFIX_ORIGINAL = "https://image.tmdb.org/t/p/original";
// for lower quality image
export const IMG_URL_PREFIX = "https://image.tmdb.org/t/p/w500";

const api = {
  fetchTrending: `${URL_PREFIX}/trending/all/week?api_key=${API_KEY}&language=en-US`,
  fetchNetflixOriginals: `${URL_PREFIX}/discover/tv?api_key=${API_KEY}&with_network=123`,
  fetchTopRated: `${URL_PREFIX}/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchActionMovies: `${URL_PREFIX}/discover/movie?api_key=${API_KEY}&with_genres=28`,
  fetchComedyMovies: `${URL_PREFIX}/discover/movie?api_key=${API_KEY}&with_genres=35`,
  fetchHorrorMovies: `${URL_PREFIX}/discover/movie?api_key=${API_KEY}&with_genres=27`,
  fetchRomanceMovies: `${URL_PREFIX}/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  fetchDocumentaries: `${URL_PREFIX}/discover/movie?api_key=${API_KEY}&with_genres=99`,
  fetchSearch: `${URL_PREFIX}/search/movie?api_key=${API_KEY}&language=en-US`,
};

export default api;
