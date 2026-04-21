"use client";

import { useMemo } from "react";
import Link from "next/link";
import MovieGrid from "../components/MovieGrid";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import Pagination from "../components/Pagination";
import useSearch from "../hooks/useSearch";
import usePagination from "../hooks/usePagination";
import { getFeaturedMovies } from "../utils/recommendations";
import { getAllMovies } from "../lib/movies";

const Home = () => {
  const movies = getAllMovies();

  const {
    searchQuery,
    setSearchQuery,
    filters,
    updateFilter,
    filteredMovies,
    allGenres,
  } = useSearch(movies);

  const { paginatedItems, totalItems } = usePagination(filteredMovies, 10);
  const featuredMovies = useMemo(() => getFeaturedMovies(movies, 5), [movies]);

  const categories = [
    { id: "bollywood", name: "Bollywood", icon: "BOL" },
    { id: "hollywood", name: "Hollywood", icon: "HOL" },
    { id: "dual-audio", name: "Dual Audio", icon: "DUAL" },
    { id: "south-indian", name: "South Indian", icon: "SOUTH" },
    { id: "web-series", name: "Web Series", icon: "SERIES" },
  ];

  const isFiltered =
    searchQuery || filters.category || filters.quality || filters.genre;

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Download Latest Movies & Web Series</h1>
          <p>Stream or download in 480p, 720p, 1080p quality</p>
          <div className="hero-search">
            <SearchBar onSearch={setSearchQuery} placeholder="Search for movies..." />
          </div>
        </div>
      </section>

      <section className="category-links">
        {categories.map((cat) => (
          <Link key={cat.id} href={`/category/${cat.id}`} className="category-card">
            <span className="category-icon">{cat.icon}</span>
            <span className="category-name">{cat.name}</span>
          </Link>
        ))}
      </section>

      <section className="main-content">
        <div className="filters-section">
          <CategoryFilter
            selectedCategory={filters.category}
            selectedQuality={filters.quality}
            selectedGenre={filters.genre}
            onCategoryChange={(value) => updateFilter("category", value)}
            onQualityChange={(value) => updateFilter("quality", value)}
            onGenreChange={(value) => updateFilter("genre", value)}
            genres={allGenres}
          />
        </div>

        {!isFiltered && <MovieGrid movies={featuredMovies} title="Featured Movies" />}

        <MovieGrid
          movies={paginatedItems}
          title={isFiltered ? `Search Results (${totalItems})` : "All Movies"}
        />

        <Pagination totalItems={totalItems} itemsPerPage={10} />
      </section>
    </div>
  );
};

export default Home;
