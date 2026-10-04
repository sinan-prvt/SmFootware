const API_BASE = (process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api').replace(/\/$/, '');
const MEDIA_BASE = API_BASE.replace('/api', '');

// Resolves a product image record ({ url } or { image }) to an absolute URL.
export function getImageUrl(img) {
  if (!img) return '';
  const src = img.url || img.image;
  if (!src) return '';
  return src.startsWith('http') ? src : `${MEDIA_BASE}${src}`;
}
