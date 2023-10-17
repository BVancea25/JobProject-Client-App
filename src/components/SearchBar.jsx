// SearchBar.js
import React, { useState } from 'react';
import "../styles/Job/SearchBar.css"
function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div className='search-bar'>
      <input
        type="text"
        placeholder="Search by company or requirements"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default SearchBar;
