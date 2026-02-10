import React, { useState, useEffect } from 'react';
import { ArrowRight, MapPin, Home, TrendingUp, Shield } from 'lucide-react';
import Header from '../../Component/Header';
import { fetchWithAuth } from '../../utils/api/fetchWithAuth';
import './PropertyHeroSection.css';
import { Link } from 'react-router-dom';

export default function PropertyHeroSection() {
  const [recent, setRecent] = useState([]);
  const [loadingRecent, setLoadingRecent] = useState(true);
  const [recentError, setRecentError] = useState('');

  useEffect(() => {
    let mounted = true;
    const fetchRecent = async () => {
      setLoadingRecent(true);
      setRecentError('');
      try {
        const res = await fetchWithAuth('https://exciting-strength-production-8da6.up.railway.app/api/properties');
        if (!res.ok) throw new Error('Failed to fetch properties');
        const data = await res.json();
        const list = Array.isArray(data) ? data : (data?.data || []);
        const sorted = list
          .filter(Boolean)
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 6);
        if (mounted) setRecent(sorted);
      } catch (err) {
        if (mounted) setRecentError(err.message || 'Error');
      } finally {
        if (mounted) setLoadingRecent(false);
      }
    };

    fetchRecent();
    return () => { mounted = false; };
  }, []);

  return (
    <>
      {/* Hero Section */}
      <div className="hero-section">
        <div className="container">
          <div className="content-left">
            <div className="hero-badge">
              <span className="badge-dot"></span>
              <span className="badge-text">Trusted by 10,000+ Property Seekers</span>
            </div>
            <h1 className="hero-title">
              Discover Your Dream Property in India's Top Cities
            </h1>
            <p className="hero-description">
              From luxury apartments to cozy homes, we connect you with verified properties 
              across India. Your perfect space is just a click away.
            </p>
            
            <div className="hero-features">
              <div className="feature-item">
                <div className="feature-icon">
                  <Home size={24} />
                </div>
                <div className="feature-text">
                  <h4>10,000+ Properties</h4>
                  <p>Verified listings</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">
                  <Shield size={24} />
                </div>
                <div className="feature-text">
                  <h4>100% Secure</h4>
                  <p>Safe transactions</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">
                  <TrendingUp size={24} />
                </div>
                <div className="feature-text">
                  <h4>Expert Advice</h4>
                  <p>Free consultation</p>
                </div>
              </div>
            </div>

            <div className="cta-buttons">
              <a href="/PropertyListing"> 
              <button className="btn-primary">
                Explore Properties
                <ArrowRight size={20} />
              </button>
              </a>
              <button className="btn-secondary">
                List Your Property
              </button>
            </div>
          </div>

          <div className="image-container">
            <div className="image-wrapper">
              <img 
                src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80" 
                alt="Beautiful modern house" 
                className="house-image main-image"
              />
              <div className="floating-card">
                <div className="floating-card-icon">
                  <MapPin size={20} />
                </div>
                <div className="floating-card-content">
                  <p className="floating-card-label">Popular Location</p>
                  <h4 className="floating-card-title">Mumbai, Maharashtra</h4>
                  <p className="floating-card-count">2,450+ Properties</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="stats-section">
        <div className="stats-container">
          <div className="stat-card">
            <h3 className="stat-number">15K+</h3>
            <p className="stat-label">Happy Customers</p>
          </div>
          <div className="stat-card">
            <h3 className="stat-number">25K+</h3>
            <p className="stat-label">Properties Listed</p>
          </div>
          <div className="stat-card">
            <h3 className="stat-number">500+</h3>
            <p className="stat-label">Cities Covered</p>
          </div>
          <div className="stat-card">
            <h3 className="stat-number">98%</h3>
            <p className="stat-label">Satisfaction Rate</p>
          </div>
        </div>
      </div>

      {/* Cities Section */}
      <div className="cities-section">
        <div className="cities-container">
          <div className="section-header-center">
            <h2 className="section-title">
              Explore Premium Properties Across India
            </h2>
            <p className="section-subtitle">
              Find your ideal home in these vibrant Indian cities
            </p>
          </div>

          <div className="cities-grid">
            <div className="city-card">
              <img 
                src="https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=600&q=80" 
                alt="Mumbai cityscape" 
                className="city-image"
              />
              <div className="city-overlay"></div>
              <div className="city-content">
                <h3 className="city-name">Mumbai</h3>
                <p className="city-count">3,200+ Properties</p>
              </div>
            </div>

            <div className="city-card">
              <img 
                src="https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&q=80" 
                alt="Delhi cityscape" 
                className="city-image"
              />
              <div className="city-overlay"></div>
              <div className="city-content">
                <h3 className="city-name">Delhi NCR</h3>
                <p className="city-count">2,850+ Properties</p>
              </div>
            </div>

            <div className="city-card">
              <img 
                src="https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=600&q=80" 
                alt="Bangalore cityscape" 
                className="city-image"
              />
              <div className="city-overlay"></div>
              <div className="city-content">
                <h3 className="city-name">Bangalore</h3>
                <p className="city-count">2,400+ Properties</p>
              </div>
            </div>

            <div className="city-card">
              <img 
                src="https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600&q=80" 
                alt="Pune cityscape" 
                className="city-image"
              />
              <div className="city-overlay"></div>
              <div className="city-content">
                <h3 className="city-name">Pune</h3>
                <p className="city-count">1,900+ Properties</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recently Added Section */}
      <div className="recently-section">
        <div className="recently-container">
          <div className="section-header">
            <div>
              <h2 className="section-title-left">Newest Listings</h2>
              <p className="section-subtitle-left">Fresh properties added this week</p>
            </div>
            <a href="/PropertyListing" className="see-all-link">
              View All Properties
              <ArrowRight size={18} />
            </a>
          </div>

          <div className="properties-grid">
            {loadingRecent && (
              <div className="loading-state">
                <div className="loading-spinner"></div>
                <p>Loading latest properties...</p>
              </div>
            )}
            
            {recentError && (
              <div className="error-state">
                <p>Error: {recentError}</p>
              </div>
            )}
            
            {!loadingRecent && !recentError && recent.length === 0 && (
              <div className="empty-state">
                <p>No properties found.</p>
              </div>
            )}

            {recent.map((p) => {
              const img = (p.images && p.images.length > 0) 
                ? p.images[0] 
                : 'https://images.unsplash.com/photo-1560185127-6b0b1d1f8b8e?w=800&q=80';
              const price = (typeof p.price === 'number') 
                ? new Intl.NumberFormat('en-IN', { 
                    style: 'currency', 
                    currency: 'INR',
                    maximumFractionDigits: 0 
                  }).format(p.price) 
                : (p.price || '—');
              
              return (
                <Link
                  to={`/PropertyDetailsPage/${p.propertyId}`}
                  key={p.propertyId}
                  className="property-card-link"
                >
                <div key={p.propertyId} className="property-card">
                  <div className="property-image-wrapper">
                    <img src={img} alt={p.title} className="property-image" />
                    <div className="property-badge">Featured</div>
                  </div>
                  <div className="property-content">
                    <h3 className="property-title">{p.title}</h3>
                    <div className="property-location">
                      <MapPin size={16} />
                      <span>{p.city}{p.state ? `, ${p.state}` : ''}</span>
                    </div>
                    <div className="property-details">
                      <span className="property-detail">
                        <span className="detail-label">Type:</span> {p.propertyType}
                      </span>
                      <span className="property-detail">
                        <span className="detail-label">PIN:</span> {p.pincode}
                      </span>
                    </div>
                    <div className="property-footer">
                      <span className="property-posted">
                        by {p.sellerName ?? 'Owner'}
                      </span>
                      <span className="property-price">{price}</span>
                    </div>
                  </div>
                </div>
                </Link>
              );
            })}
          </div>
          
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="cta-section">
        <div className="cta-container">
          <div className="cta-content">
            <h2 className="cta-title">
              Ready to Find Your Perfect Home?
            </h2>
            <p className="cta-description">
              Join thousands of satisfied customers who found their dream properties 
              with us. Get expert guidance and personalized recommendations tailored 
              to your needs and budget.
            </p>
            <div className="cta-actions">
              <button className="cta-button-primary">
                Get Started Now
                <ArrowRight size={20} />
              </button>
              <button className="cta-button-secondary">
                Schedule Consultation
              </button>
            </div>
            <div className="cta-trust">
              <div className="trust-badge">
                <Shield size={20} />
                <span>100% Verified Properties</span>
              </div>
              <div className="trust-badge">
                <Home size={20} />
                <span>Expert Property Advisors</span>
              </div>
            </div>
          </div>
          <div className="cta-image-wrapper">
            <img 
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80" 
              alt="Happy family in their new home" 
              className="cta-image"
            />
          </div>
        </div>
      </div>
    </>
  );
}