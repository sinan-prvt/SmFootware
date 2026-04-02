import React, { useState, useEffect, useCallback } from 'react';
import '../styles/PublicCatalog.css';
import Hero from '../components/public/Hero';
import FeaturedSections from '../components/public/FeaturedSections';
import ProductFilters from '../components/public/ProductFilters';
import ProductGrid from '../components/public/ProductGrid';
import ProductModal from '../components/public/ProductModal';
import ScrollReveal from '../components/public/ScrollReveal';

// Removed dummy data to ensure only database content is displayed

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
      const baseUrl = (process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api').replace(/\/$/, '');
      const response = await fetch(`${baseUrl}/categories/`);
      const data = await response.json();
      const results = data.results || data;
      setCategories(results);
    } catch (err) {
      console.error('Error fetching categories:', err);
      setCategories([]);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);



  const fetchProducts = useCallback(async (currentPage = 1) => {
    if (currentPage === 1) setLoading(true);

    try {
      const baseUrl = (process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api').replace(/\/$/, '');
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
        setProducts(results);
      } else {
        setProducts(prev => [...prev, ...results]);
      }
      
      setHasMore(isPaginated ? data.next !== null : false);
    } catch (err) {
      console.error('Error fetching products:', err);
      if (currentPage === 1) {
        setProducts([]);
        setHasMore(false);
      }
    } finally {
      setLoading(false);
    }
  }, [filters.category, filters.search]);

  useEffect(() => {
    setPage(1);
    fetchProducts(1);
  }, [filters, fetchProducts]);

  useEffect(() => {
    if (page > 1) {
      fetchProducts(page);
    }
  }, [page, fetchProducts]);

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
              <h3>SM FOOTWEAR</h3>
              <p>Premium authentic sneakers & apparel.</p>
            </div>
            <div className="footer-links">
              <a href="/admin">Vendor Portal</a>
              <a href="/contact">Contact Us</a>
              <a href="#collection">Privacy Policy</a>
              <a href="#collection">Terms of Service</a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} SM Footwear. All rights reserved.</p>
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
