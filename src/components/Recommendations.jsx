import MovieCard from './MovieCard';

const Recommendations = ({ movies, title = "You Might Also Like" }) => {
  if (!movies || movies.length === 0) return null;

  return (
    <div className="recommendations">
      <h3 className="recommendations-title">{title}</h3>
      <div className="recommendations-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Recommendations;
