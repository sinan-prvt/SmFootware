import React, { useState, useEffect } from 'react';
import '../../styles/ProductManager.css';

function ProductManager() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    brand_name: '',
    gender: 'UNISEX',
    category: '',
    price: '',
    show_price: true,
    article: '',
    colors: '',
    sizes: '',
  });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
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

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
    
    // Generate previews
    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(previews);
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

        setFormData({ name: '', brand_name: '', gender: 'UNISEX', category: '', price: '', show_price: true, article: '', colors: '', sizes: '' });
        setSelectedFiles([]);
        setImagePreviews([]);
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
      brand_name: product.brand_name || '',
      gender: product.gender || 'UNISEX',
      category: product.category,
      price: product.price,
      show_price: product.show_price,
      article: product.article || '',
      colors: product.colors || '',
      sizes: product.sizes || '',
    });
    setEditingId(product.id);
    setSelectedFiles([]);
    setImagePreviews([]);
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
    <div className="product-manager-premium">
      <div className="manager-header">
        <h2>Manage Inventory</h2>
        <p className="subtitle">Update article numbers and available colors</p>
      </div>

      <form onSubmit={handleSubmit} className="product-form-advanced">
        <div className="form-sections-grid">
          <div className="form-main-info">
            <div className="form-group-row">
              <input
                type="text"
                placeholder="Product Name"
                className="input-premium"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Brand Name (e.g. Nike)"
                className="input-premium"
                value={formData.brand_name}
                onChange={(e) => setFormData({ ...formData, brand_name: e.target.value })}
              />
            </div>

            <div className="form-group-row">
               <select
                className="input-premium"
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                required
              >
                <option value="MEN">Men</option>
                <option value="WOMEN">Women</option>
                <option value="KIDS">Kids</option>
                <option value="UNISEX">Unisex / All</option>
              </select>
              <select
                className="input-premium"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
              >
                <option value="">Select Collection</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div className="form-group-row">
              <input
                type="number"
                placeholder="Price"
                className="input-premium"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                step="0.01"
              />
              <input
                type="text"
                placeholder="Article Number (e.g. ART-992)"
                className="input-premium"
                value={formData.article}
                onChange={(e) => setFormData({ ...formData, article: e.target.value })}
              />
            </div>

            <div className="form-group-row">
              <input
                type="text"
                placeholder="Available Colors (e.g. Black, White, Red)"
                className="input-premium"
                value={formData.colors}
                onChange={(e) => setFormData({ ...formData, colors: e.target.value })}
              />
              <input
                type="text"
                placeholder="Available Sizes (7, 8, 9...)"
                className="input-premium"
                value={formData.sizes}
                onChange={(e) => setFormData({ ...formData, sizes: e.target.value })}
              />
            </div>
            
            <label className="checkbox-premium">
              <input
                type="checkbox"
                checked={formData.show_price}
                onChange={(e) => setFormData({ ...formData, show_price: e.target.checked })}
              />
              <span>Display Price Públically</span>
            </label>
          </div>

          <div className="form-media-upload">
            <div className="media-dropzone">
              <label htmlFor="file-upload" className="dropzone-label">
                <div className="upload-icon">+</div>
                <span>Upload Photos</span>
              </label>
              <input
                id="file-upload"
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                style={{display: 'none'}}
              />
            </div>

            {imagePreviews.length > 0 && (
              <div className="media-previews-grid">
                {imagePreviews.map((url, idx) => (
                  <div key={idx} className="preview-card">
                    <img src={url} alt={`Preview ${idx + 1}`} />
                    {idx === 0 && <span className="primary-pill">PRIMARY</span>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {error && <p className="error-banner">{error}</p>}
        <button type="submit" className="submit-btn-premium">
          {editingId ? 'UPDATE PRODUCT' : 'CONFIRM & ADD TO CATALOG'}
        </button>
      </form>

      <div className="product-list-modern">
        <h3 className="list-title">Active Inventory</h3>
        <div className="list-grid">
          {products.map((prod) => (
            <div key={prod.id} className="inventory-card">
              <div className="card-thumb">
                {prod.primary_image ? (
                  <img src={prod.primary_image.image.startsWith('http') ? prod.primary_image.image : `http://localhost:8000${prod.primary_image.image}`} alt={prod.name} />
                ) : (
                  <div className="no-img-placeholder">NO IMAGE</div>
                )}
              </div>
              <div className="card-details">
                <span className="card-gender">{prod.gender} | {prod.brand_name}</span>
                <h4 className="card-title">{prod.name}</h4>
                <div className="card-meta">
                   <p className="card-price">${prod.price}</p>
                   <p className="card-code">{prod.code}</p>
                </div>
              </div>
              <div className="card-actions">
                <button onClick={() => handleEdit(prod)} className="action-btn-edit">Edit</button>
                <button onClick={() => handleDelete(prod.id)} className="action-btn-delete">×</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductManager;
