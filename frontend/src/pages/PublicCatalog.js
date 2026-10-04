import React, { useState, useEffect, useCallback } from 'react';
import '../styles/PublicCatalog.css';
import Hero from '../components/public/Hero';
import FeaturedSections from '../components/public/FeaturedSections';
import ProductFilters from '../components/public/ProductFilters';
import ProductGrid from '../components/public/ProductGrid';
import ProductModal from '../components/public/ProductModal';
import ScrollReveal from '../components/public/ScrollReveal';
import Navbar from '../components/public/Navbar';
import MotionLayer from '../components/public/MotionLayer';
import Marquee from '../components/public/Marquee';
import Statement from '../components/public/Statement';
import SiteFooter from '../components/public/SiteFooter';

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

  // Arriving from another page via /#collection: scroll once the layout exists.
  useEffect(() => {
    if (window.location.hash !== '#collection') return undefined;
    const timer = setTimeout(() => {
      const el = document.getElementById('collection');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 400);
    return () => clearTimeout(timer);
  }, []);



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
      <MotionLayer />
      <Navbar />

      <Hero />

      <Marquee />
      <Marquee
        variant="accent"
        reverse
        items={['Sneakers', 'Formals', 'Loafers', 'Sandals', 'Boots', 'Kids', 'Sports']}
      />

      <Statement />

      <FeaturedSections />

      <section className="collection-section">
        <header className="catalog-header" id="collection">
          <ScrollReveal variant="blur">
            <span className="eyebrow">Superior quality</span>
          </ScrollReveal>
          <h2 className="catalog-title">
            <ScrollReveal variant="clip" delay={0.05}><span>Our</span></ScrollReveal>
            <ScrollReveal variant="clip" delay={0.18}><span className="catalog-title-accent">Collection</span></ScrollReveal>
          </h2>
          <ScrollReveal variant="up" delay={0.3}>
            <p>Explore the full Footonia range — filter by category or search for a style.</p>
          </ScrollReveal>
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
            onLoadMore={() => setPage(prev => prev + 1)}
            hasMore={hasMore}
          />
        </div>
      </section>

      <SiteFooter />

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
