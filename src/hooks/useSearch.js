"use client";

import { useState, useMemo, useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const useSearch = (movies, initialFilters = {}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    category: initialFilters.category || "",
    quality: initialFilters.quality || "",
    genre: initialFilters.genre || "",
  });

  const effectiveFilters = useMemo(
    () => ({
      ...filters,
      category: initialFilters.category || filters.category,
    }),
    [filters, initialFilters.category],
  );

  const filteredMovies = useMemo(() => {
    return movies.filter((movie) => {
      const matchesSearch = movie.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      const matchesCategory =
        !effectiveFilters.category || movie.category === effectiveFilters.category;

      const matchesQuality =
        !effectiveFilters.quality ||
        movie.downloadLinks.some((link) => link.quality === effectiveFilters.quality);

      const matchesGenre =
        !effectiveFilters.genre || movie.genre.includes(effectiveFilters.genre);

      return matchesSearch && matchesCategory && matchesQuality && matchesGenre;
    });
  }, [effectiveFilters, movies, searchQuery]);

  const allGenres = useMemo(() => {
    const genres = new Set();
    movies.forEach((movie) => {
      movie.genre.forEach((genreName) => genres.add(genreName));
    });
    return Array.from(genres).sort();
  }, [movies]);

  const resetPagination = useCallback(() => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.delete("page");
    const query = newParams.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }, [pathname, router, searchParams]);

  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    resetPagination();
  };

  const handleSearchQuery = useCallback(
    (value) => {
      setSearchQuery(value);
      resetPagination();
    },
    [resetPagination],
  );

  return {
    searchQuery,
    setSearchQuery: handleSearchQuery,
    filters: effectiveFilters,
    updateFilter,
    filteredMovies,
    allGenres,
  };
};

export default useSearch;
