import React from 'react';
import '../../styles/ProductFilters.css';

function ProductFilters({ categories, filters, setFilters }) {
  return (
    <div className="catalog-filters">
      <div className="filter-controls-upper">
        <div className="search-box">
          <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            placeholder="Search our collection..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="search-input-premium"
          />
        </div>
      </div>

      <div className="category-tags-scroll">
        <div className="category-tags">
          <button
            className={`tag-pill ${filters.category === '' ? 'active' : ''}`}
            onClick={() => setFilters({ ...filters, category: '' })}
          >
            ALL
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`tag-pill ${filters.category === String(cat.id) ? 'active' : ''}`}
              onClick={() => setFilters({ ...filters, category: String(cat.id) })}
            >
              {cat.name.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductFilters;
