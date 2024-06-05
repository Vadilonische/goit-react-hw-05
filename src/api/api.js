import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3/";
const API_KEY = "5eb01c4a01db11bf189d4fe09a0d2a72";

export const fetchTrendMovies = async () => {
  const response = await axios.get(`trending/movie/day?api_key=${API_KEY}`);
  return response.data;
};

export const fetchSearchMovie = async (query) => {
  const response = await axios.get(
    `search/movie?api_key=${API_KEY}&query=${query}&include_adult=false&language=en-US&page=1`
  );
  return response.data;
};

export const fetchMovieDetails = async (movieId) => {
  const response = await axios.get(
    `movie/${movieId}?api_key=${API_KEY}&language=en-US`
  );
  return response.data;
};

export const fetchMovieCast = async (movieId) => {
  const response = await axios.get(
    `movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`
  );
  return response.data;
};

export const fetchMovieReviews = async (movieId) => {
  const response = await axios.get(
    `movie/${movieId}/reviews?api_key=${API_KEY}&language=en-US`
  );
  return response.data;
};

// токен eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZWIwMWM0YTAxZGIxMWJmMTg5ZDRmZTA5YTBkMmE3MiIsInN1YiI6IjY2NWVlYWIyYWE5NjlmNzNlYjFjMzJmMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lvjjtU6ljGbD9iY57FczNktuwZcjlu9QEwCkQfdT8m0
