import movies from "../data/movies.json";
import { getRecommendations } from "../utils/recommendations";

export const CATEGORY_TITLES = {
  bollywood: "Bollywood Movies",
  hollywood: "Hollywood Movies",
  "dual-audio": "Dual Audio Movies",
  "south-indian": "South Indian Movies",
  "web-series": "Web Series",
};

export const CATEGORY_LABELS = {
  bollywood: "Bollywood",
  hollywood: "Hollywood",
  "dual-audio": "Dual Audio",
  "south-indian": "South Indian",
  "web-series": "Web Series",
};

const VALID_CATEGORIES = new Set(Object.keys(CATEGORY_TITLES));

export const getAllMovies = () => movies;

export const getMovieById = (id) => {
  const numericId = Number.parseInt(id, 10);

  if (Number.isNaN(numericId)) {
    return null;
  }

  return movies.find((movie) => movie.id === numericId) ?? null;
};

export const isValidCategory = (categoryId) => VALID_CATEGORIES.has(categoryId);

export const getRecommendationsForMovie = (movie, limit = 5) =>
  getRecommendations(movie, movies, limit);
