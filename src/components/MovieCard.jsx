"use client";

import { useState } from "react";
import Link from "next/link";

// Base64 encoded SVG fallback image (no external dependency)
const FALLBACK_IMAGE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='450' viewBox='0 0 300 450'%3E%3Crect fill='%231a1a2e' width='300' height='450'/%3E%3Ctext x='50%25' y='45%25' fill='%23e50914' font-family='Arial' font-size='48' text-anchor='middle'%3E%F0%9F%8E%AC%3C/text%3E%3Ctext x='50%25' y='55%25' fill='%23888' font-family='Arial' font-size='16' text-anchor='middle'%3ENo Image%3C/text%3E%3C/svg%3E";

const MovieCard = ({ movie }) => {
  const [imgError, setImgError] = useState(false);

  const handleImageError = () => {
    setImgError(true);
  };

  return (
    <Link href={`/movie/${movie.id}`} className="movie-card">
      <div className="movie-poster">
        <img
          src={imgError ? FALLBACK_IMAGE : movie.poster}
          alt={movie.title}
          loading="lazy"
          onError={handleImageError}
        />
        <div className="movie-overlay">
          <span className="play-icon">&#9658;</span>
        </div>
        <span className="quality-badge">{movie.quality}</span>
        <span className="rating-badge">&#9733; {movie.rating}</span>
      </div>
      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <div className="movie-meta">
          <span className="movie-year">{movie.year}</span>
          <span className="movie-genre">{movie.genre[0]}</span>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
