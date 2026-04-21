import { useState } from 'react';

const SearchBar = ({ onSearch, placeholder = "Search movies..." }) => {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <div className="search-bar">
      <span className="search-icon">&#128269;</span>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
        className="search-input"
      />
      {query && (
        <button className="clear-btn" onClick={handleClear}>
          &times;
        </button>
      )}
    </div>
  );
};

export default SearchBar;
