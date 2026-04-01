import React, { useState, useEffect, useCallback } from 'react';
import '../../styles/CategoryManager.css';

function CategoryManager() {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({ name: '' });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('admin_token');

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    const startTime = Date.now();
    try {
      const baseUrl = (process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api').replace(/\/$/, '');
      const response = await fetch(`${baseUrl}/categories/`, {
        headers: token ? { 'Authorization': `Token ${token}` } : {},
      });
      const data = await response.json();
      
      const elapsed = Date.now() - startTime;
      const delay = Math.max(0, 2500 - elapsed);

      setTimeout(() => {
        setCategories(data.results || data);
        setLoading(false);
      }, delay);
    } catch (err) {
      setError('Error fetching categories');
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const renderSkeletonCategories = () => (
    Array(4).fill(0).map((_, i) => (
      <div key={`skel-cat-${i}`} className="category-item skeleton-item">
        <div>
          <div className="skeleton-box" style={{ width: '120px', height: '20px', marginBottom: '8px' }}></div>
          <div className="skeleton-box" style={{ width: '60px', height: '12px' }}></div>
        </div>
        <div className="category-actions">
           <div className="skeleton-box skeleton-action"></div>
           <div className="skeleton-box skeleton-action"></div>
        </div>
      </div>
    ))
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const baseUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api';
    const url = editingId
      ? `${baseUrl}/categories/${editingId}/`
      : `${baseUrl}/categories/`;

    const method = editingId ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({ name: '' });
        setEditingId(null);
        fetchCategories();
      } else {
        const errorData = await response.json();
        const errorMessage = errorData.name ? `Name: ${errorData.name[0]}` : (errorData.error || errorData.details || 'Error saving category');
        setError(errorMessage);
      }
    } catch (err) {
      setError('Error saving category');
    }
  };

  const handleEdit = (category) => {
    setFormData({ name: category.name });
    setEditingId(category.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure?')) return;

    const baseUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api';
    try {
      const response = await fetch(`${baseUrl}/categories/${id}/`, {
        method: 'DELETE',
        headers: { 'Authorization': `Token ${token}` },
      });

      if (response.ok) {
        fetchCategories();
      } else {
        setError('Error deleting category');
      }
    } catch (err) {
      setError('Error deleting category');
    }
  };

  return (
    <div className="category-manager">
      <h2>Manage Categories</h2>

      <form onSubmit={handleSubmit} className="category-form">
        <input
          type="text"
          placeholder="Category Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">
          {editingId ? 'Update Category' : 'Add Category'}
        </button>
      </form>

      <div className="category-list">
        {loading ? renderSkeletonCategories() : categories.map((cat) => (
          <div key={cat.id} className="category-item">
            <div>
              <h3>{cat.name}</h3>
              <small>{cat.product_count} products</small>
            </div>
            <div className="category-actions">
              <button onClick={() => handleEdit(cat)} className="edit-btn">Edit</button>
              <button onClick={() => handleDelete(cat.id)} className="delete-btn">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryManager;
