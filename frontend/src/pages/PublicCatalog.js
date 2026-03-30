import React, { useState, useEffect, useCallback } from 'react';
import '../styles/PublicCatalog.css';
import Hero from '../components/public/Hero';
import FeaturedSections from '../components/public/FeaturedSections';
import ProductFilters from '../components/public/ProductFilters';
import ProductGrid from '../components/public/ProductGrid';
import ProductModal from '../components/public/ProductModal';
import ScrollReveal from '../components/public/ScrollReveal';

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
    price: 12499.00,
    show_price: true,
    article: "NK-AM270-BLK",
    sizes: ["7", "7.5", "8", "8.5", "9", "10", "11"],
    images: [
      { id: 101, url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop", alt_text: "Nike Air Max 270 Side" },
      { id: 102, url: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&h=600&fit=crop", alt_text: "Nike Air Max Close up" }
    ],
    is_available: true,
  },
  {
    id: 2,
    name: "Adidas UltraBoost",
    brand_name: "Adidas",
    category_name: "Adidas",
    price: 15999.00,
    show_price: true,
    article: "AD-UB21-WHT",
    sizes: ["8", "9", "10", "11", "12"],
    images: [
      { id: 201, url: "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=600&h=600&fit=crop", alt_text: "Adidas UltraBoost Side" }
    ],
    is_available: true,
  },
  {
    id: 3,
    name: "Puma RS-X",
    brand_name: "Puma",
    category_name: "Puma",
    price: 8999.00,
    show_price: true,
    article: "PU-RSX-MULT",
    sizes: ["6", "7", "8", "9", "10"],
    images: [
      { id: 301, url: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&h=600&fit=crop", alt_text: "Puma RS-X Side" }
    ],
    is_available: true,
  },
  {
    id: 4,
    name: "New Balance 574 Core",
    brand_name: "New Balance",
    category_name: "New Balance",
    price: 7499.00,
    show_price: true,
    article: "NB-574-GRY",
    sizes: ["7", "8", "8.5", "9", "10", "11.5"],
    images: [
      { id: 401, url: "https://images.unsplash.com/photo-1539185441755-769473a23570?w=600&h=600&fit=crop", alt_text: "New Balance 574 Side" }
    ],
    is_available: true,
  }
];

function PublicCatalog() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filters, setFilters] = useState({ category: '', search: '' });
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const fetchCategories = useCallback(async () => {
    try {
      const baseUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api';
      const response = await fetch(`${baseUrl}/categories/`);
      const data = await response.json();
      const results = data.results || data;
      setCategories(results.length > 0 ? results : DUMMY_CATEGORIES);
    } catch (err) {
      console.error('Error fetching categories:', err);
      setCategories(DUMMY_CATEGORIES);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setPage(1);
    fetchProducts(1);
  }, [filters, fetchProducts]);

  // Append items when page > 1 changes
  useEffect(() => {
    if (page > 1) {
      fetchProducts(page);
    }
  }, [page, fetchProducts]);


  const fetchProducts = useCallback(async (currentPage = 1) => {
    if (currentPage === 1) setLoading(true);

    try {
      const baseUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api';
      let url = `${baseUrl}/products/`;
      const params = new URLSearchParams();

      if (filters.category) params.append('category', filters.category);
      if (filters.search) params.append('search', filters.search);
      if (currentPage > 1) params.append('page', currentPage);

      if (params.toString()) url += '?' + params.toString();

      const response = await fetch(url);
      const data = await response.json();
      
      const results = data.results || data;
      const isPaginated = data.next !== undefined;
      
      if (currentPage === 1) {
        setProducts(results.length > 0 ? results : DUMMY_PRODUCTS);
      } else {
        setProducts(prev => [...prev, ...results]);
      }
      
      setHasMore(isPaginated ? data.next !== null : false);
    } catch (err) {
      console.error('Error fetching products:', err);
      if (currentPage === 1) {
        setProducts(DUMMY_PRODUCTS);
        setHasMore(false);
      }
    } finally {
      setLoading(false);
    }
  }, [filters.category, filters.search]);

  return (
    <div className="public-catalog">
      <ScrollReveal delay={0.2} threshold={0.01}>
        <Hero />
      </ScrollReveal>

      <ScrollReveal threshold={0.1}>
        <FeaturedSections />
      </ScrollReveal>

      <ScrollReveal threshold={0.2}>
        <header className="catalog-header" id="collection">
          <span className="superior-tag">SUPERIOR QUALITY</span>
          <h1>OUR COLLECTION</h1>
          <p>Explore our premium footwear selection</p>
        </header>
      </ScrollReveal>

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
          onLoadMore={() => setPage(prev => prev + 1)}
          hasMore={hasMore}
        />
      </div>

      <ScrollReveal threshold={0.1}>
        <footer className="catalog-footer">
          <div className="footer-content">
            <div className="footer-brand">
              <h3>SM FOOTWARE</h3>
              <p>Premium authentic sneakers & apparel.</p>
            </div>
            <div className="footer-links">
              <a href="/admin">Vendor Portal</a>
              <a href="#collection">Privacy Policy</a>
              <a href="#collection">Terms of Service</a>
              <a href="#collection">Contact Us</a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} SM Footware. All rights reserved.</p>
          </div>
        </footer>
      </ScrollReveal>

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
