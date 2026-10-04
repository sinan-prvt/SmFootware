import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AdminPanel.css';
import { Toaster } from 'react-hot-toast';
import CategoryManager from '../components/admin/CategoryManager';
import ProductManager from '../components/admin/ProductManager';

const TABS = [
  {
    id: 'inventory',
    label: 'Active Inventory',
    short: 'Inventory',
    icon: <path d="M3 7l9-4 9 4-9 4-9-4zm0 5l9 4 9-4M3 17l9 4 9-4" />,
  },
  {
    id: 'add-product',
    label: 'Add Product',
    short: 'Add',
    icon: <path d="M12 5v14M5 12h14" />,
  },
  {
    id: 'categories',
    label: 'Manage Collections',
    short: 'Collections',
    icon: <path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" />,
  },
];

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
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          className: 'footonia-toast',
          success: { iconTheme: { primary: '#d4ff3a', secondary: '#0d0d0d' } },
          error: { iconTheme: { primary: '#ff4d1c', secondary: '#fff' } },
        }}
      />
      <header className="admin-header">
        <a href="/" className="admin-brand" title="View store">
          <img src="/favicon.svg" alt="" />
          <span className="admin-brand-word">FOOTONIA</span>
          <span className="admin-brand-tag">Admin</span>
        </a>
        <div className="admin-header-actions">
          <a href="/" className="view-store-btn" target="_blank" rel="noopener noreferrer">
            View store <span aria-hidden="true">↗</span>
          </a>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </header>

      <nav className="admin-nav" aria-label="Admin sections">
        <div className="admin-nav-track">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              className={activeTab === tab.id ? 'active' : ''}
              onClick={() => setActiveTab(tab.id)}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                {tab.icon}
              </svg>
              <span className="tab-label-full">{tab.label}</span>
              <span className="tab-label-short">{tab.short}</span>
            </button>
          ))}
        </div>
      </nav>

      <main className="admin-content" key={activeTab}>
        {(activeTab === 'inventory' || activeTab === 'add-product') && (
          <ProductManager activeTab={activeTab} setActiveTab={setActiveTab} />
        )}
        {activeTab === 'categories' && <CategoryManager />}
      </main>
    </div>
  );
}

export default AdminPanel;
