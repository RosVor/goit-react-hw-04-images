import React, { useState } from 'react';

const Searchbar = ({ query, onChange, onSubmit }) => {
  const [search, setSearch] = useState(query || ''); // 

  const handleChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    onChange && onChange(value); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit && onSubmit(search); 
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handleSubmit}>
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={search}
          onChange={handleChange}
        />
      </form>
    </header>
  );
};

export default Searchbar;
