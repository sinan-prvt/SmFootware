import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AdminPanel.css';
import { Toaster } from 'react-hot-toast';
import CategoryManager from '../components/admin/CategoryManager';
import ProductManager from '../components/admin/ProductManager';

function AdminPanel({ setIsAuthenticated }) {
  const [activeTab, setActiveTab] = useState('inventory');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    setIsAuthenticated(false);
    navigate('/admin/login');
  };

  return (
    <div className="admin-panel">
      <Toaster position="top-right" reverseOrder={false} />
      <header className="admin-header">
        <h1>Admin Panel</h1>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </header>

      <nav className="admin-nav">
         <button
          className={activeTab === 'inventory' ? 'active' : ''}
          onClick={() => setActiveTab('inventory')}
        >
          Active Inventory
        </button>
        <button
          className={activeTab === 'add-product' ? 'active' : ''}
          onClick={() => setActiveTab('add-product')}
        >
          + Add Product
        </button>
        <button
          className={activeTab === 'categories' ? 'active' : ''}
          onClick={() => setActiveTab('categories')}
        >
          Manage Collections
        </button>
      </nav>

      <main className="admin-content">
        {(activeTab === 'inventory' || activeTab === 'add-product') && (
          <ProductManager activeTab={activeTab} setActiveTab={setActiveTab} />
        )}
        {activeTab === 'categories' && <CategoryManager />}
      </main>
    </div>
  );
}

export default AdminPanel;
