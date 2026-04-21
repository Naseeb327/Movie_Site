import Link from "next/link";
import Recommendations from "../components/Recommendations";
import { CATEGORY_LABELS } from "../lib/movies";

const MovieDetail = ({ movie, recommendations }) => {
  if (!movie) {
    return (
      <div className="movie-detail">
        <div className="not-found">
          <h2>Movie Not Found</h2>
          <p>The movie you are looking for does not exist.</p>
          <Link href="/" className="back-btn">
            Go Back Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="movie-detail">
      <div className="movie-detail-container">
        <div className="movie-info-section">
          <div className="movie-poster-large">
            <img src={movie.poster} alt={movie.title} />
            <span className="quality-badge-large">{movie.quality}</span>
          </div>

          <div className="movie-details">
            <h1 className="movie-title-large">{movie.title}</h1>

            <div className="movie-meta-large">
              <span className="meta-item">
                <span className="meta-label">Year:</span>
                <span className="meta-value">{movie.year}</span>
              </span>
              <span className="meta-item">
                <span className="meta-label">Rating:</span>
                <span className="meta-value rating">&#9733; {movie.rating}</span>
              </span>
              <span className="meta-item">
                <span className="meta-label">Category:</span>
                <Link href={`/category/${movie.category}`} className="meta-value category-link">
                  {CATEGORY_LABELS[movie.category]}
                </Link>
              </span>
            </div>

            <div className="genre-tags">
              {movie.genre.map((genreName) => (
                <span key={genreName} className="genre-tag">
                  {genreName}
                </span>
              ))}
            </div>

            <p className="movie-description">{movie.description}</p>

            <div className="download-section">
              <h3>Download Links</h3>
              <div className="download-buttons">
                {movie.downloadLinks.map((link) => (
                  <a
                    key={`${link.quality}-${link.size}`}
                    className="download-btn"
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="download-quality">{link.quality}</span>
                    <span className="download-size">{link.size}</span>
                    <span className="download-icon">&#8595;</span>
                  </a>
                ))}
              </div>
              <p className="download-note">Click to open download page in new tab</p>
            </div>
          </div>
        </div>

        <Recommendations movies={recommendations} />
      </div>
    </div>
  );
};

export default MovieDetail;
