const URL_PREFIX = "https://api.themoviedb.org/3"
export const API_KEY = "305c1f113377a22dbb322569c5ff54df"
export const token = "8qlOkxz4wq"

export const LOCAL_URL_PREFIX = "http://localhost:5000/api/movies"

// for high quality images
export const IMG_URL_PREFIX_ORIGINAL = "https://image.tmdb.org/t/p/original"
// for lower quality image
export const IMG_URL_PREFIX = "https://image.tmdb.org/t/p/w500"

const api = {
  fetchTrending: `${LOCAL_URL_PREFIX}/trending?token=${token}`,
  fetchNetflixOriginals: `${URL_PREFIX}/discover/tv?api_key=${API_KEY}&with_network=123`,
  fetchTopRated: `${LOCAL_URL_PREFIX}/top-rate?token=${token}`,
  fetchActionMovies: `${LOCAL_URL_PREFIX}/discover/28?token=${token}`,
  fetchComedyMovies: `${LOCAL_URL_PREFIX}/discover/35?token=${token}`,
  fetchHorrorMovies: `${LOCAL_URL_PREFIX}/discover/27?token=${token}`,
  fetchRomanceMovies: `${LOCAL_URL_PREFIX}/discover/10749?token=${token}`,
  fetchDocumentaries: `${LOCAL_URL_PREFIX}/discover/99?token=${token}`,
  fetchSearch: `${URL_PREFIX}/search/movie?api_key=${API_KEY}&language=en-US`,
}

export default api
