import React from 'react';
import '../../styles/ProductFilters.css';

function ProductFilters({ categories, filters, setFilters }) {
  return (
    <aside className="filters">
      <h2>Filter</h2>

      <div className="filter-group">
        <input
          type="text"
          placeholder="Search products..."
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          className="search-input"
        />
      </div>

      <div className="filter-group">
        <h3>Categories</h3>
        <select
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          className="category-select"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>
    </aside>
  );
}

export default ProductFilters;
