"use client";

import MovieGrid from "../components/MovieGrid";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import Pagination from "../components/Pagination";
import useSearch from "../hooks/useSearch";
import usePagination from "../hooks/usePagination";
import { CATEGORY_TITLES, getAllMovies } from "../lib/movies";

const Category = ({ categoryId }) => {
  const movies = getAllMovies();

  const {
    searchQuery,
    setSearchQuery,
    filters,
    updateFilter,
    filteredMovies,
    allGenres,
  } = useSearch(movies, { category: categoryId });

  const { paginatedItems, totalItems } = usePagination(filteredMovies, 10);

  const categoryTitle = CATEGORY_TITLES[categoryId] || "Movies";

  return (
    <div className="category-page">
      <div className="category-header">
        <h1>{categoryTitle}</h1>
        <p>{totalItems} titles available</p>
      </div>

      <div className="category-content">
        <div className="category-toolbar">
          <SearchBar
            onSearch={setSearchQuery}
            placeholder={`Search in ${categoryTitle}...`}
          />
          <CategoryFilter
            selectedCategory=""
            selectedQuality={filters.quality}
            selectedGenre={filters.genre}
            onCategoryChange={() => {}}
            onQualityChange={(value) => updateFilter("quality", value)}
            onGenreChange={(value) => updateFilter("genre", value)}
            genres={allGenres}
          />
        </div>

        <MovieGrid
          movies={paginatedItems}
          title={searchQuery ? `Search Results (${totalItems})` : ""}
        />

        <Pagination totalItems={totalItems} itemsPerPage={10} />
      </div>
    </div>
  );
};

export default Category;
