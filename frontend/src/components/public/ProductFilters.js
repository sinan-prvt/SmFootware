import React from 'react';
import '../../styles/ProductFilters.css';

function ProductFilters({ categories, filters, setFilters }) {
  return (
    <div className="app-filters">
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search items..."
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          className="app-search-input"
        />
      </div>

      <div className="category-pills-container">
        <button
          className={`category-pill ${filters.category === '' ? 'active' : ''}`}
          onClick={() => setFilters({ ...filters, category: '' })}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`category-pill ${filters.category === String(cat.id) ? 'active' : ''}`}
            onClick={() => setFilters({ ...filters, category: String(cat.id) })}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ProductFilters;
