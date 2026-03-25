import React, { useState, useEffect } from 'react';
import '../styles/PublicCatalog.css';
import Hero from '../components/public/Hero';
import ProductFilters from '../components/public/ProductFilters';
import ProductGrid from '../components/public/ProductGrid';
import ProductModal from '../components/public/ProductModal';

const DUMMY_CATEGORIES = [
  { id: 1, name: "Nike" },
  { id: 2, name: "Adidas" },
  { id: 3, name: "Puma" },
  { id: 4, name: "New Balance" },
  { id: 5, name: "Vans" }
];

const DUMMY_PRODUCTS = [
  {
    id: 1,
    name: "Nike Air Max 270",
    brand_name: "Nike",
    category_name: "Nike",
    price: 150.00,
    show_price: true,
    code: "NK-AM270-BLK",
    sizes: ["7", "7.5", "8", "8.5", "9", "10", "11"],
    images: [
      { id: 101, url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop", alt_text: "Nike Air Max 270 Side" },
      { id: 102, url: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&h=600&fit=crop", alt_text: "Nike Air Max Close up" }
    ],
    is_available: true,
    description: "The Nike Air Max 270 delivers visible air under every step. Updated for modern comfort, it nods to the original 1991 Air Max 180 with its exaggerated tongue top and heritage tongue logo. Essential for wholesale collections."
  },
  {
    id: 2,
    name: "Adidas UltraBoost",
    brand_name: "Adidas",
    category_name: "Adidas",
    price: 180.00,
    show_price: true,
    code: "AD-UB21-WHT",
    sizes: ["8", "9", "10", "11", "12"],
    images: [
      { id: 201, url: "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=600&h=600&fit=crop", alt_text: "Adidas UltraBoost Side" }
    ],
    is_available: true,
    description: "Ultraboost is made for comfort and energy return. Featuring a lightweight Primeknit upper and responsive Boost midsole to keep you moving."
  },
  {
    id: 3,
    name: "Puma RS-X",
    brand_name: "Puma",
    category_name: "Puma",
    price: 110.00,
    show_price: true,
    code: "PU-RSX-MULT",
    sizes: ["6", "7", "8", "9", "10"],
    images: [
      { id: 301, url: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&h=600&fit=crop", alt_text: "Puma RS-X Side" }
    ],
    is_available: true,
    description: "The RS-X is back. The future-retro silhouette of this sneaker returns with progressive aesthetic and angular details, complete with nubuck and suede overlays."
  },
  {
    id: 4,
    name: "New Balance 574 Core",
    brand_name: "New Balance",
    category_name: "New Balance",
    price: 85.00,
    show_price: true,
    code: "NB-574-GRY",
    sizes: ["7", "8", "8.5", "9", "10", "11.5"],
    images: [
      { id: 401, url: "https://images.unsplash.com/photo-1539185441755-769473a23570?w=600&h=600&fit=crop", alt_text: "New Balance 574 Side" }
    ],
    is_available: true,
    description: "The 574 was built to be a reliable shoe that could do a lot of different things well. The 574 brings you a classic, versatile sneaker."
  }
];

function PublicCatalog() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filters, setFilters] = useState({ category: '', search: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, [filters]);

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/categories/');
      const data = await response.json();
      const results = data.results || data;
      setCategories(results.length > 0 ? results : DUMMY_CATEGORIES);
    } catch (err) {
      console.error('Error fetching categories:', err);
      setCategories(DUMMY_CATEGORIES);
    }
  };

  const fetchProducts = async () => {
    try {
      let url = 'http://localhost:8000/api/products/';
      const params = new URLSearchParams();

      if (filters.category) params.append('category', filters.category);
      if (filters.search) params.append('search', filters.search);

      if (params.toString()) url += '?' + params.toString();

      const response = await fetch(url);
      const data = await response.json();
      const results = data.results || data;
      setProducts(results.length > 0 ? results : DUMMY_PRODUCTS);
    } catch (err) {
      console.error('Error fetching products:', err);
      setProducts(DUMMY_PRODUCTS);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="public-catalog">
      <Hero />

      <header className="catalog-header">
        <h1>OUR COLLECTION</h1>
        <p>Explore our premium footwear selection</p>
      </header>

      <div className="catalog-container">
        <ProductFilters
          categories={categories}
          filters={filters}
          setFilters={setFilters}
        />

        <ProductGrid
          products={products}
          loading={loading}
          onSelectProduct={setSelectedProduct}
        />
      </div>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}

export default PublicCatalog;
