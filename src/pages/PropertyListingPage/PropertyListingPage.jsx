import React, { useState, useEffect } from 'react';
import { Search, MapPin, Home, Heart, Share2, ChevronDown, Bed, Bath, Square, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fetchWithAuth } from '../../utils/api/fetchWithAuth';
import './PropertyListingPage.css';

export default function PropertyListingPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState('all');
  const [propertyType, setPropertyType] = useState('all');
  const [cityFilter, setCityFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // helper to read current user id from localStorage (matches other files)
  const getStoredUserId = () => {
    try {
      const st = localStorage.getItem('user');
      if (!st) return null;
      const u = JSON.parse(st);
      return u?.userId ?? u?.id ?? u?.user_id ?? null;
    } catch {
      return null;
    }
  };

  // fire-and-forget POST to count view when user clicks a property
  const sendView = async (propertyId) => {
    try {
      await fetchWithAuth('https://exciting-strength-production-8da6.up.railway.app/api/properties/view', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ propertyId }),
      });
    } catch (err) {
      console.error('Error sending view:', err);
    }
  };

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        const response = await fetchWithAuth('https://exciting-strength-production-8da6.up.railway.app/api/properties');
        if (!response.ok) throw new Error('Failed to fetch properties');
        const data = await response.json();
        setProperties(data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const uniqueCities = ['all', ...Array.from(new Set(properties.map(p => p.city).filter(Boolean)))];
  const typeOptions = ['all', 'VILLA', 'APARTMENT', 'HOUSE', 'LAND'];

  const filtered = properties.filter(p => {
    const q = searchTerm.trim().toLowerCase();
    if (q) {
      const match = (p.title || '').toLowerCase().includes(q) || 
                     (p.city || '').toLowerCase().includes(q) || 
                     (p.sellerName || '').toLowerCase().includes(q);
      if (!match) return false;
    }
    if (propertyType !== 'all' && (p.propertyType || '').toUpperCase() !== propertyType) return false;
    if (cityFilter !== 'all' && (p.city || '') !== cityFilter) return false;

    if (priceRange === 'below1cr' && !(p.price < 10000000)) return false;
    if (priceRange === '1to2cr' && !(p.price >= 10000000 && p.price <= 20000000)) return false;
    if (priceRange === 'above2cr' && !(p.price > 20000000)) return false;

    return true;
  });

  // Sort filtered properties
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'recent') {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else if (sortBy === 'price-low') {
      return (a.price || 0) - (b.price || 0);
    } else if (sortBy === 'price-high') {
      return (b.price || 0) - (a.price || 0);
    }
    return 0;
  });

  const formatPrice = (num) => {
    try {
      return new Intl.NumberFormat('en-IN', { 
        style: 'currency', 
        currency: 'INR',
        maximumFractionDigits: 0 
      }).format(num);
    } catch {
      return `₹${num}`;
    }
  };

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffTime = Math.abs(now - date);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 0) return 'Today';
      if (diffDays === 1) return 'Yesterday';
      if (diffDays < 7) return `${diffDays} days ago`;
      if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
      return date.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' });
    } catch {
      return 'Recently';
    }
  };

  const placeholder = 'https://images.unsplash.com/photo-1560185127-6b0b1d1f8b8e?w=800&q=80';

  return (
    <div className="listing-page">
      <div className="listing-header">
        <div className="header-container">
          <h1 className="page-title">Find Your Dream Property</h1>
          <p className="page-subtitle">Browse through our selection of premium properties across India</p>

          <div className="filters-container">
            <div className="filter-group">
              <Search size={18} className="filter-icon" />
              <input
                type="text"
                placeholder="Search by title, city or seller"
                className="filter-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="filter-group">
              <Home size={18} className="filter-icon" />
              <div className="select-wrapper">
                <select
                  className="filter-select"
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                >
                  {typeOptions.map(t => (
                    <option key={t} value={t}>
                      {t === 'all' ? 'All Types' : t}
                    </option>
                  ))}
                </select>
                <ChevronDown size={18} className="chevron-icon" />
              </div>
            </div>

            <div className="filter-group">
              <MapPin size={18} className="filter-icon" />
              <div className="select-wrapper">
                <select
                  className="filter-select"
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                >
                  <option value="all">All Prices</option>
                  <option value="below1cr">Below ₹1 Cr</option>
                  <option value="1to2cr">₹1 Cr - ₹2 Cr</option>
                  <option value="above2cr">Above ₹2 Cr</option>
                </select>
                <ChevronDown size={18} className="chevron-icon" />
              </div>
            </div>

            <div className="filter-group">
              <MapPin size={18} className="filter-icon" />
              <div className="select-wrapper">
                <select
                  className="filter-select"
                  value={cityFilter}
                  onChange={(e) => setCityFilter(e.target.value)}
                >
                  {uniqueCities.map(c => (
                    <option key={c} value={c}>
                      {c === 'all' ? 'All Cities' : c}
                    </option>
                  ))}
                </select>
                <ChevronDown size={18} className="chevron-icon" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="listing-content">
        <div className="results-header">
          <div className="results-info">
            <span className="results-count">
              {loading ? 'Loading properties...' : 
               error ? `Error: ${error}` : 
               `Showing ${sorted.length} ${sorted.length === 1 ? 'property' : 'properties'}`}
            </span>
            {!loading && !error && properties.length > 0 && (
              <span className="results-total">of {properties.length} total</span>
            )}
          </div>
          <div className="sort-by">
            <span className="sort-label">Sort by:</span>
            <select 
              className="sort-select" 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="recent">Most Recent</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Loading properties...</p>
          </div>
        ) : error ? (
          <div className="error-state">
            <p>Error loading properties: {error}</p>
          </div>
        ) : sorted.length === 0 ? (
          <div className="empty-state">
            <Home size={48} />
            <h3>No properties found</h3>
            <p>Try adjusting your filters to see more results</p>
          </div>
        ) : (
          <div className="properties-grid">
            {sorted.map((p) => {
              const img = (p.images && p.images.length > 0) ? p.images[0] : placeholder;
              return (
                <Link
                  to={`/PropertyDetailsPage/${p.propertyId}`}
                  key={p.propertyId}
                  className="property-card-link"
                  // onClick={() => sendView(p.propertyId)}
                >
                  <div className="property-card">
                    <div className="property-image-container">
                      <img src={img} alt={p.title} className="property-image" />
                      {p.status === 'AVAILABLE' && (
                        <div className="status-badge available">Available</div>
                      )}
                      {p.status === 'SOLD' && (
                        <div className="status-badge sold">Sold</div>
                      )}
                      <div className="property-actions">
                        <button 
                          className="action-button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            // Add to favorites logic
                          }}
                        >
                          <Heart size={18} className="action-icon" />
                        </button>
                        <button 
                          className="action-button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            // Share logic
                          }}
                        >
                          <Share2 size={18} className="action-icon" />
                        </button>
                      </div>
                    </div>

                    <div className="property-content">
                      <div className="property-header">
                        <div className="property-type-badge">{p.propertyType}</div>
                        <div className="property-date">
                          <Calendar size={14} />
                          <span>{formatDate(p.createdAt)}</span>
                        </div>
                      </div>

                      <h3 className="property-title">{p.title}</h3>
                      
                      <div className="property-location">
                        <MapPin size={16} />
                        <span>{p.city}{p.state ? `, ${p.state}` : ''}</span>
                      </div>

                      {/* <div className="property-features">
                        {p.bedrooms && (
                          <div className="feature-item">
                            <Bed size={18} className="feature-icon" />
                            <span>{p.bedrooms} Beds</span>
                          </div>
                        )}
                        {p.bathrooms && (
                          <div className="feature-item">
                            <Bath size={18} className="feature-icon" />
                            <span>{p.bathrooms} Baths</span>
                          </div>
                        )}
                        {p.area && (
                          <div className="feature-item">
                            <Square size={18} className="feature-icon" />
                            <span>{p.area} sqft</span>
                          </div>
                        )}
                      </div> */}

                      <div className="property-footer">
                        <div className="property-seller">
                          <div className="seller-avatar">
                            {(p.sellerName || 'O')[0].toUpperCase()}
                          </div>
                          <span className="seller-name">{p.sellerName || 'Owner'}</span>
                        </div>
                        <div className="property-price">{formatPrice(p.price)}</div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}