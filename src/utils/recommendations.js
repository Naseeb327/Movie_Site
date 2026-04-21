/**
 * Get movie recommendations based on genre and category matching
 * @param {Object} currentMovie - The movie to base recommendations on
 * @param {Array} allMovies - All available movies
 * @param {number} limit - Maximum number of recommendations
 * @returns {Array} Recommended movies
 */
export const getRecommendations = (currentMovie, allMovies, limit = 5) => {
  if (!currentMovie || !allMovies) return [];

  // Filter out the current movie
  const otherMovies = allMovies.filter((m) => m.id !== currentMovie.id);

  // Score each movie based on matching criteria
  const scoredMovies = otherMovies.map((movie) => {
    let score = 0;

    // Genre matching (2 points per matching genre)
    const matchingGenres = movie.genre.filter((g) =>
      currentMovie.genre.includes(g)
    );
    score += matchingGenres.length * 2;

    // Category matching (3 points)
    if (movie.category === currentMovie.category) {
      score += 3;
    }

    // Rating similarity (1 point if within 1.0)
    const ratingDiff = Math.abs(movie.rating - currentMovie.rating);
    if (ratingDiff <= 1.0) {
      score += 1;
    }

    // Year similarity (1 point if within 2 years)
    const yearDiff = Math.abs(movie.year - currentMovie.year);
    if (yearDiff <= 2) {
      score += 1;
    }

    return { ...movie, score };
  });

  // Sort by score (descending) and return top results
  return scoredMovies
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((movie) => {
      const movieWithoutScore = { ...movie };
      delete movieWithoutScore.score;
      return movieWithoutScore;
    });
};

/**
 * Get featured movies (high-rated, diverse categories)
 * @param {Array} movies - All movies
 * @param {number} limit - Number of featured movies
 * @returns {Array} Featured movies
 */
export const getFeaturedMovies = (movies, limit = 6) => {
  // Sort by rating and get top movies
  const sortedByRating = [...movies].sort((a, b) => b.rating - a.rating);

  // Try to get diversity in categories
  const featured = [];
  const usedCategories = new Set();

  for (const movie of sortedByRating) {
    if (featured.length >= limit) break;

    // Prioritize movies from categories not yet represented
    if (!usedCategories.has(movie.category) || featured.length < limit) {
      featured.push(movie);
      usedCategories.add(movie.category);
    }
  }

  return featured;
};

/**
 * Get movies by category
 * @param {Array} movies - All movies
 * @param {string} category - Category to filter
 * @returns {Array} Movies in category
 */
export const getMoviesByCategory = (movies, category) => {
  return movies.filter((m) => m.category === category);
};
