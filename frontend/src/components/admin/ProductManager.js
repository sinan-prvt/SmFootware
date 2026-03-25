import React, { useState, useEffect } from 'react';
import '../../styles/ProductManager.css';

function ProductManager() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    price: '',
    show_price: true,
    code: '',
    sizes: '',
  });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');

  const token = localStorage.getItem('admin_token');

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/products/', {
        headers: token ? { 'Authorization': `Token ${token}` } : {},
      });
      const data = await response.json();
      setProducts(data.results || data);
    } catch (err) {
      setError('Error fetching products');
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/categories/');
      const data = await response.json();
      setCategories(data.results || data);
    } catch (err) {
      setError('Error fetching categories');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const url = editingId
      ? `http://localhost:8000/api/products/${editingId}/`
      : 'http://localhost:8000/api/products/';

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
        const productData = await response.json();
        
        // Upload images if any are selected
        if (selectedFiles && selectedFiles.length > 0) {
          const productId = editingId || productData.id;
          
          for (let i = 0; i < selectedFiles.length; i++) {
             const imgForm = new FormData();
             imgForm.append('product_id', productId);
             imgForm.append('image', selectedFiles[i]);
             imgForm.append('is_primary', i === 0 ? "true" : "false");

             await fetch('http://localhost:8000/api/products/upload_image/', {
               method: 'POST',
               headers: { 'Authorization': `Token ${token}` },
               body: imgForm
             });
          }
        }

        setFormData({ name: '', category: '', description: '', price: '', show_price: true, code: '', sizes: '' });
        setSelectedFiles([]);
        setEditingId(null);
        fetchProducts();
      } else {
        setError('Error saving product');
      }
    } catch (err) {
      setError('Error saving product');
    }
  };

  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      category: product.category,
      description: product.description,
      price: product.price,
      show_price: product.show_price,
      code: product.code || '',
      sizes: product.sizes || '',
    });
    setEditingId(product.id);
    setSelectedFiles([]);
    setEditingId(product.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure?')) return;

    try {
      const response = await fetch(`http://localhost:8000/api/products/${id}/`, {
        method: 'DELETE',
        headers: { 'Authorization': `Token ${token}` },
      });

      if (response.ok) {
        fetchProducts();
      } else {
        setError('Error deleting product');
      }
    } catch (err) {
      setError('Error deleting product');
    }
  };

  return (
    <div className="product-manager">
      <h2>Manage Products</h2>

      <form onSubmit={handleSubmit} className="product-form">
        <input
          type="text"
          placeholder="Product Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <select
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          step="0.01"
        />
        <input
          type="text"
          placeholder="Product Code / SKU (e.g. NK-23B-9)"
          value={formData.code}
          onChange={(e) => setFormData({ ...formData, code: e.target.value })}
        />
        <input
          type="text"
          placeholder="Available Sizes (Comma separated: 7, 8, 9, 10)"
          value={formData.sizes}
          onChange={(e) => setFormData({ ...formData, sizes: e.target.value })}
        />
        <div className="file-upload-group" style={{marginTop: '10px'}}>
          <label style={{display: 'block', marginBottom: '5px', fontSize: '14px', color: '#555'}}>Upload Product Images</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => setSelectedFiles(e.target.files)}
            style={{padding: '10px 0'}}
          />
        </div>
        <label>
          <input
            type="checkbox"
            checked={formData.show_price}
            onChange={(e) => setFormData({ ...formData, show_price: e.target.checked })}
          />
          Show Price
        </label>
        {error && <p className="error">{error}</p>}
        <button type="submit">
          {editingId ? 'Update Product' : 'Add Product'}
        </button>
      </form>

      <div className="product-list">
        {products.map((prod) => (
          <div key={prod.id} className="product-item">
            <div className="product-info">
              <h3>{prod.name} {prod.code && <span style={{fontSize: '12px', color: '#888'}}>({prod.code})</span>}</h3>
              <p className="category">{prod.category_name}</p>
              {prod.show_price && prod.price && <p className="price">${prod.price}</p>}
            </div>
            <div className="product-actions">
              <button onClick={() => handleEdit(prod)} className="edit-btn">Edit</button>
              <button onClick={() => handleDelete(prod.id)} className="delete-btn">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductManager;
