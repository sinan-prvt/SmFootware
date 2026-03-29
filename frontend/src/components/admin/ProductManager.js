import React, { useState, useEffect } from 'react';
import '../../styles/ProductManager.css';
import { toast } from 'react-hot-toast';

function ProductManager({ showOnly = 'form' }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [nextUrl, setNextUrl] = useState(null);
  const [prevUrl, setPrevUrl] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    brand_name: '',
    gender: 'UNISEX',
    category: '',
    price: '',
    show_price: true,
    in_stock: true,
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
    fetchCategories();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
        fetchProducts();
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm, showOnly]);

  const fetchProducts = async (url) => {
    try {
      let finalUrl = url || `http://localhost:8000/api/products/?search=${searchTerm}`;
      const response = await fetch(finalUrl, {
        headers: token ? { 'Authorization': `Token ${token}` } : {},
      });
      const data = await response.json();
      
      if (data.results) {
        setProducts(data.results);
        setTotalCount(data.count);
        setNextUrl(data.next);
        setPrevUrl(data.previous);
        
        if (finalUrl.includes('page=')) {
          const pageStr = finalUrl.split('page=')[1].split('&')[0];
          setCurrentPage(parseInt(pageStr));
        } else {
          setCurrentPage(1);
        }
      } else {
        setProducts(data);
        setTotalCount(data.length);
      }
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

  const toggleStockStatus = async (product, e) => {
    if (e) e.stopPropagation();
    try {
      const response = await fetch(`http://localhost:8000/api/products/${product.id}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`,
        },
        body: JSON.stringify({ in_stock: !product.in_stock }),
      });
      if (response.ok) {
        fetchProducts(`http://localhost:8000/api/products/?page=${currentPage}&search=${searchTerm}`);
        if (selectedProduct && selectedProduct.id === product.id) {
            setSelectedProduct({ ...selectedProduct, in_stock: !product.in_stock });
        }
        toast.success(`Product marked as ${!product.in_stock ? 'In Stock' : 'Out of Stock'}`);
      } else {
        toast.error('Failed to update stock status');
      }
    } catch (err) {
      toast.error('Network error during status update');
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
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

        setFormData({ name: '', brand_name: '', gender: 'UNISEX', category: '', price: '', show_price: true, in_stock: true, article: '', colors: '', sizes: '' });
        setSelectedFiles([]);
        setImagePreviews([]);
        setEditingId(null);
        fetchProducts();
        toast.success(editingId ? 'Product updated successfully!' : 'Product added successfully!');
      } else {
        const errorData = await response.json();
        toast.error(`Error: ${JSON.stringify(errorData)}`);
      }
    } catch (err) {
      toast.error('Network error saving product');
    }
  };

  const handleEdit = (product, e) => {
    if (e) e.stopPropagation();
    setFormData({
      name: product.name,
      brand_name: product.brand_name || '',
      gender: product.gender || 'UNISEX',
      category: product.category,
      price: product.price,
      show_price: product.show_price,
      in_stock: product.in_stock !== undefined ? product.in_stock : true,
      article: product.article || '',
      colors: product.colors || '',
      sizes: product.sizes || '',
    });
    setEditingId(product.id);
    setSelectedFiles([]);
    setImagePreviews([]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id, e) => {
    if (e) e.stopPropagation();
    if (!window.confirm('Delete product? This cannot be undone.')) return;
    try {
      const response = await fetch(`http://localhost:8000/api/products/${id}/`, {
        method: 'DELETE',
        headers: { 'Authorization': `Token ${token}` },
      });
      if (response.ok) {
        if (selectedProduct && selectedProduct.id === id) setSelectedProduct(null);
        fetchProducts();
        toast.success('Product removed from inventory');
      } else {
        toast.error('Failed to delete product');
      }
    } catch (err) {
      toast.error('Network error during deletion');
    }
  };

  const uniqueBrands = new Set(products.map(p => p.brand_name)).size;

  return (
    <div className="product-manager-container">
      {selectedProduct && (
        <div className="product-detail-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="product-detail-modal" onClick={e => e.stopPropagation()}>
            <button className="close-detail" onClick={() => setSelectedProduct(null)}>&times;</button>
            
            <div className="modal-content-grid">
              <div className="modal-media-side">
                <div className="primary-display">
                    {selectedProduct.primary_image ? (
                        <img src={selectedProduct.primary_image.image.startsWith('http') ? selectedProduct.primary_image.image : `http://localhost:8000${selectedProduct.primary_image.image}`} alt={selectedProduct.name} />
                    ) : (
                        <div className="no-img-big">NO IMAGE</div>
                    )}
                </div>
                <div className="gallery-strip">
                    {selectedProduct.images && selectedProduct.images.map((img, i) => (
                        <div key={i} className="gallery-thumb">
                            <img src={img.image.startsWith('http') ? img.image : `http://localhost:8000${img.image}`} alt="" />
                        </div>
                    ))}
                </div>
              </div>

              <div className="modal-info-side">
                <div className="info-header-row">
                    <span className="info-sku">#{selectedProduct.article}</span>
                    <button 
                        className={`status-pill ${selectedProduct.in_stock ? 'in' : 'out'} toggle-btn`}
                        onClick={(e) => toggleStockStatus(selectedProduct, e)}
                        title="Click to toggle stock"
                    >
                        {selectedProduct.in_stock ? 'IN STOCK' : 'OUT OF STOCK'}
                    </button>
                </div>
                <h2 className="info-name">{selectedProduct.name}</h2>
                <div className="info-brand-label">{selectedProduct.brand_name}</div>

                <div className="info-specs-grid">
                    <div className="spec-tile">
                        <label>GENDER</label>
                        <span>{selectedProduct.gender}</span>
                    </div>
                    <div className="spec-tile">
                        <label>CATEGORY</label>
                        <span>{selectedProduct.category_name}</span>
                    </div>
                    <div className="spec-tile">
                        <label>PRICE</label>
                        <span className="price-bold">₹{parseFloat(selectedProduct.price).toLocaleString('en-IN')}</span>
                    </div>
                </div>

                <div className="info-text-section">
                    <label>COLORS</label>
                    <p>{selectedProduct.colors || 'Standard'}</p>
                </div>

                <div className="info-text-section">
                    <label>SIZE RANGE</label>
                    <div className="size-tags-container">
                        {selectedProduct.sizes ? selectedProduct.sizes.split(',').map((s, i) => (
                            <span key={i} className="size-tag">{s.trim()}</span>
                        )) : 'Not Specified'}
                    </div>
                </div>

                <div className="modal-actions-row">
                    <button onClick={() => {
                        handleEdit(selectedProduct);
                        setSelectedProduct(null);
                    }} className="action-edit-btn">EDIT PRODUCT</button>
                    <button onClick={(e) => handleDelete(selectedProduct.id, e)} className="action-delete-btn">DELETE PRODUCT</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showOnly === 'form' && (
        <div className="form-fade-in">
          <div className="manager-header">
            <div className="header-pill">PRODUCT MANAGEMENT</div>
            <h2>{editingId ? 'Edit Product Details' : 'Add New Product'}</h2>
            <p className="subtitle">Manage article numbers, colors, and stock availability</p>
          </div>

          <form onSubmit={handleSubmit} className="product-form-advanced">
            <div className="form-sections-grid">
              <div className="form-main-info">
                <div className="form-group-row">
                  <div className="input-with-label">
                    <label>Product Name</label>
                    <input
                      type="text"
                      className="input-premium"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="input-with-label">
                    <label>Brand Name</label>
                    <input
                      type="text"
                      className="input-premium"
                      value={formData.brand_name}
                      onChange={(e) => setFormData({ ...formData, brand_name: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group-row">
                  <div className="input-with-label">
                    <label>Gender</label>
                    <select
                      className="input-premium"
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                      required
                    >
                      <option value="MEN">Men</option>
                      <option value="WOMEN">Women</option>
                      <option value="KIDS">Kids</option>
                      <option value="UNISEX">Unisex</option>
                    </select>
                  </div>
                  <div className="input-with-label">
                    <label>Category</label>
                    <select
                      className="input-premium"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      required
                    >
                      <option value="">Select Category</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group-row">
                  <div className="input-with-label">
                    <label>Price (₹)</label>
                    <input
                      type="number"
                      className="input-premium"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    />
                  </div>
                  <div className="input-with-label">
                    <label>Article Number</label>
                    <input
                      type="text"
                      className="input-premium"
                      value={formData.article}
                      onChange={(e) => setFormData({ ...formData, article: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group-row">
                  <div className="input-with-label">
                    <label>Colors</label>
                    <input
                      type="text"
                      className="input-premium"
                      value={formData.colors}
                      onChange={(e) => setFormData({ ...formData, colors: e.target.value })}
                      placeholder="e.g. Black, Navy, White"
                    />
                  </div>
                  <div className="input-with-label">
                    <label>Size Range</label>
                    <input
                      type="text"
                      className="input-premium"
                      value={formData.sizes}
                      onChange={(e) => setFormData({ ...formData, sizes: e.target.value })}
                      placeholder="e.g. 7, 8, 9, 10"
                    />
                  </div>
                </div>
                
                <div className="form-footer-actions">
                  <div className="checkbox-group">
                      <label className="checkbox-premium">
                        <input
                          type="checkbox"
                          checked={formData.show_price}
                          onChange={(e) => setFormData({ ...formData, show_price: e.target.checked })}
                        />
                        <span>Show Price</span>
                      </label>
                      <label className="checkbox-premium">
                        <input
                          type="checkbox"
                          checked={formData.in_stock}
                          onChange={(e) => setFormData({ ...formData, in_stock: e.target.checked })}
                        />
                        <span>In Stock</span>
                      </label>
                  </div>
                  {editingId && (
                    <button type="button" className="cancel-btn" onClick={() => {
                        setEditingId(null);
                        setFormData({ name: '', brand_name: '', gender: 'UNISEX', category: '', price: '', show_price: true, in_stock: true, article: '', colors: '', sizes: '' });
                    }}>CANCEL EDIT</button>
                  )}
                </div>
              </div>

              <div className="form-media-upload">
                <div className="media-dropzone">
                  <label htmlFor="file-upload" className="dropzone-label">
                    <div className="upload-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
                      </svg>
                    </div>
                    <span>Upload Product Images</span>
                  </label>
                  <input id="file-upload" type="file" multiple accept="image/*" onChange={handleFileChange} style={{display: 'none'}} />
                </div>
                {imagePreviews.length > 0 && (
                  <div className="media-previews-grid">
                    {imagePreviews.map((url, idx) => (
                      <div key={idx} className="preview-card">
                        <img src={url} alt="Preview" />
                        {idx === 0 && <span className="primary-tag">PRIMARY</span>}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            {error && <p className="error-banner">{error}</p>}
            <button type="submit" className="submit-btn-premium large">
              {editingId ? 'SAVE CHANGES' : 'ADD PRODUCT'}
            </button>
          </form>
        </div>
      )}

      {showOnly === 'list' && (
        <div className="inventory-dashboard">
          <div className="dashboard-stats-grid">
            <div className="stat-box">
              <span className="stat-header">Total Products</span>
              <span className="stat-number">{totalCount}</span>
            </div>
            <div className="stat-box">
              <span className="stat-header">Active Brands</span>
              <span className="stat-number">{uniqueBrands}</span>
            </div>
            <div className="stat-box">
              <span className="stat-header">System Status</span>
              <span className="stat-status-pill green">ACTIVE</span>
            </div>
          </div>

          <div className="inventory-header-row">
            <div className="inventory-title-group">
                <h3>Inventory Management</h3>
                <p>Page {currentPage} of {Math.ceil(totalCount / 6)}</p>
            </div>
            <div className="inventory-search-container">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="search-icon">
                    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
                <input 
                    type="text" 
                    placeholder="Search products..." 
                    className="inventory-search-input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
          </div>

          <div className="table-container">
            <table className="inventory-table">
              <thead>
                <tr>
                  <th>Article</th>
                  <th>Product Details</th>
                  <th>Classification</th>
                  <th>Status</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((prod) => (
                  <tr key={prod.id} onClick={() => setSelectedProduct(prod)} className="clickable-row">
                    <td className="col-article">
                      <div className="article-thumb-mini">
                        {prod.primary_image ? (
                          <img src={prod.primary_image.image.startsWith('http') ? prod.primary_image.image : `http://localhost:8000${prod.primary_image.image}`} alt="" />
                        ) : (
                          <div className="no-img-mini">#</div>
                        )}
                      </div>
                      <span className="sku-code">#{prod.article}</span>
                    </td>
                    <td className="col-product">
                      <div className="product-meta-stack">
                        <span className="prod-name-main">{prod.name}</span>
                        <span className="pill-brand">{prod.brand_name}</span>
                      </div>
                    </td>
                    <td className="col-classification">
                      <div className="pill-classification-container">
                        <span className={`pill-gender ${prod.gender.toLowerCase()}`}>{prod.gender}</span>
                        <span className="pill-category">{prod.category_name}</span>
                      </div>
                    </td>
                    <td className="col-status">
                        <button 
                            className={`status-pill-mini ${prod.in_stock ? 'in' : 'out'} toggle-btn`}
                            onClick={(e) => toggleStockStatus(prod, e)}
                            title="Click to toggle stock"
                        >
                            {prod.in_stock ? 'IN STOCK' : 'OUT OF STOCK'}
                        </button>
                    </td>
                    <td className="col-price">
                        <span className="currency-symbol">₹</span>
                        <span className="price-value">{parseFloat(prod.price).toLocaleString('en-IN')}</span>
                    </td>
                    <td className="col-actions">
                      <div className="action-button-group">
                        <button onClick={(e) => handleEdit(prod, e)} className="btn-act edit" title="Edit">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>
                            </svg>
                        </button>
                        <button onClick={(e) => handleDelete(prod.id, e)} className="btn-act delete" title="Delete">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/>
                            </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalCount > 6 && (
            <div className="pagination-controls">
              <button 
                className="pag-btn" 
                disabled={!prevUrl} 
                onClick={() => fetchProducts(prevUrl)}
              >
                Previous
              </button>
              <div className="page-numbers">
                {Array.from({ length: Math.ceil(totalCount / 6) }, (_, i) => (
                  <button 
                    key={i} 
                    className={`nav-num ${currentPage === i + 1 ? 'active' : ''}`}
                    onClick={() => fetchProducts(`http://localhost:8000/api/products/?page=${i + 1}&search=${searchTerm}`)}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <button 
                className="pag-btn" 
                disabled={!nextUrl} 
                onClick={() => fetchProducts(nextUrl)}
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ProductManager;
