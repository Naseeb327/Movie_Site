const CategoryFilter = ({
  selectedCategory,
  selectedQuality,
  selectedGenre,
  onCategoryChange,
  onQualityChange,
  onGenreChange,
  genres = []
}) => {
  const categories = [
    { value: '', label: 'All Categories' },
    { value: 'bollywood', label: 'Bollywood' },
    { value: 'hollywood', label: 'Hollywood' },
    { value: 'dual-audio', label: 'Dual Audio' },
    { value: 'south-indian', label: 'South Indian' },
    { value: 'web-series', label: 'Web Series' },
  ];

  const qualities = [
    { value: '', label: 'All Quality' },
    { value: '480p', label: '480p' },
    { value: '720p', label: '720p' },
    { value: '1080p', label: '1080p' },
  ];

  return (
    <div className="category-filter">
      <div className="filter-group">
        <label>Category</label>
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="filter-select"
        >
          {categories.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label>Quality</label>
        <select
          value={selectedQuality}
          onChange={(e) => onQualityChange(e.target.value)}
          className="filter-select"
        >
          {qualities.map((q) => (
            <option key={q.value} value={q.value}>
              {q.label}
            </option>
          ))}
        </select>
      </div>

      {genres.length > 0 && (
        <div className="filter-group">
          <label>Genre</label>
          <select
            value={selectedGenre}
            onChange={(e) => onGenreChange(e.target.value)}
            className="filter-select"
          >
            <option value="">All Genres</option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default CategoryFilter;
