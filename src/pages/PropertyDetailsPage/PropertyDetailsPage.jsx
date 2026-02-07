import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Heart, Share2, ChevronLeft, ChevronRight } from 'lucide-react';

export default function PropertyDetailsPage() {
  const { propertyId } = useParams();
  const navigate = useNavigate();
  
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageIndex, setImageIndex] = useState(0);
  const [enquiryText, setEnquiryText] = useState('');

  useEffect(() => {
    console.log('PropertyID from URL:', propertyId);
    fetchProperty();
  }, [propertyId]);

  const fetchProperty = async () => {
    try {
      setLoading(true);
      const url = `http://localhost:8080/api/properties/${propertyId}`;
      console.log('Fetching from URL:', url);
      
      // Get token from localStorage
      const token = localStorage.getItem('token');
      console.log('Token available:', !!token);
      
      // Build headers with token if available
      const headers = {
        'Content-Type': 'application/json'
      };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      const response = await fetch(url, { headers });
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.log('Error response:', errorText);
        throw new Error(`Server error: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Property data received:', data);
      setProperty(data);
      setError(null);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message);
      setProperty(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', fontSize: '18px' }}>
        <p>⏳ Loading property details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <p style={{ color: 'red', fontSize: '18px', marginBottom: '1rem' }}>❌ Error: {error}</p>
        <p style={{ color: '#6b7280', marginBottom: '1rem' }}>Please login to view property details</p>
        <button 
          onClick={() => navigate('/login')} 
          style={{ 
            padding: '0.75rem 1.5rem', 
            cursor: 'pointer', 
            background: '#3b82f6', 
            color: 'white', 
            border: 'none', 
            borderRadius: '8px',
            fontSize: '16px',
            marginRight: '1rem'
          }}
        >
          Login
        </button>
        <button 
          onClick={() => navigate('/PropertyListing')} 
          style={{ 
            padding: '0.75rem 1.5rem', 
            cursor: 'pointer', 
            background: '#e5e7eb', 
            color: '#1a1a2e', 
            border: 'none', 
            borderRadius: '8px',
            fontSize: '16px'
          }}
        >
          Back to Properties
        </button>
      </div>
    );
  }

  if (!property) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <p style={{ fontSize: '18px', color: 'red', marginBottom: '1rem' }}>Property not found</p>
        <button 
          onClick={() => navigate('/PropertyListing')} 
          style={{ 
            padding: '0.75rem 1.5rem', 
            cursor: 'pointer', 
            background: '#3b82f6', 
            color: 'white', 
            border: 'none', 
            borderRadius: '8px',
            fontSize: '16px'
          }}
        >
          Back to Properties
        </button>
      </div>
    );
  }

  const images = property.images && property.images.length > 0 
    ? property.images 
    : ['https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800'];

  const formatPrice = (price) => {
    if (!price) return '₹0';
    return '₹' + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const handleSave = () => {
    alert('Property saved to your favorites!');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property.title,
        url: window.location.href
      });
    } else {
      alert('Share link copied!');
    }
  };

  const handleEnquiry = () => {
    if (!enquiryText.trim()) {
      alert('Please enter a message');
      return;
    }
    alert('Enquiry submitted successfully!');
    setEnquiryText('');
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem', background: '#fff', minHeight: '100vh' }}>
      
      {/* Back Button */}
      <button 
        onClick={() => navigate('/PropertyListing')}
        style={{ 
          background: 'none', 
          border: 'none', 
          color: '#3b82f6', 
          cursor: 'pointer', 
          marginBottom: '2rem', 
          fontSize: '16px', 
          fontWeight: '600' 
        }}
      >
        ← Back to Properties
      </button>

      {/* Main Container */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        
        {/* LEFT COLUMN */}
        <div>
          
          {/* Image Gallery */}
          <div style={{ 
            position: 'relative', 
            marginBottom: '2rem', 
            borderRadius: '12px', 
            overflow: 'hidden',
            background: '#f0f0f0'
          }}>
            <img 
              src={images[imageIndex]} 
              alt={property.title}
              style={{ 
                width: '100%', 
                height: '400px', 
                objectFit: 'cover',
                display: 'block'
              }}
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800';
              }}
            />
            
            {images.length > 1 && (
              <>
                <button 
                  onClick={() => setImageIndex(imageIndex === 0 ? images.length - 1 : imageIndex - 1)}
                  style={{
                    position: 'absolute',
                    left: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'white',
                    border: 'none',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                    zIndex: 10
                  }}
                >
                  <ChevronLeft size={20} />
                </button>
                
                <button 
                  onClick={() => setImageIndex(imageIndex === images.length - 1 ? 0 : imageIndex + 1)}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'white',
                    border: 'none',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                    zIndex: 10
                  }}
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}

            {/* Image Counter */}
            <div style={{ 
              position: 'absolute', 
              bottom: '10px', 
              right: '10px', 
              background: 'rgba(0,0,0,0.6)', 
              color: 'white', 
              padding: '0.5rem 1rem', 
              borderRadius: '20px', 
              fontSize: '0.875rem',
              zIndex: 10
            }}>
              {imageIndex + 1} / {images.length}
            </div>
          </div>

          {/* Title and Basic Info */}
          <div style={{ marginBottom: '2rem' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: '700', color: '#1a1a2e', marginBottom: '1rem' }}>
              {property.title}
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#6b7280', fontSize: '1rem', marginBottom: '1rem' }}>
              <MapPin size={20} />
              <span>{property.city}, {property.state} - {property.pincode}</span>
            </div>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: '#3b82f6' }}>
              {formatPrice(property.price)}
            </div>
          </div>

          {/* Description */}
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#1a1a2e', fontWeight: '700' }}>About this property</h2>
            <p style={{ color: '#6b7280', lineHeight: '1.6', fontSize: '1rem' }}>
              {property.description || `A beautiful ${property.propertyType} located in ${property.city}, ${property.state}. Available for purchase at ${formatPrice(property.price)}.`}
            </p>
          </div>

          {/* Key Details Grid */}
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#1a1a2e', fontWeight: '700' }}>Key Details</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              <div style={{ padding: '1rem', background: '#f9fafb', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>Property Type</div>
                <div style={{ fontSize: '1rem', fontWeight: '600', color: '#1a1a2e' }}>{property.propertyType}</div>
              </div>
              <div style={{ padding: '1rem', background: '#f9fafb', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>City</div>
                <div style={{ fontSize: '1rem', fontWeight: '600', color: '#1a1a2e' }}>{property.city}</div>
              </div>
              <div style={{ padding: '1rem', background: '#f9fafb', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>State</div>
                <div style={{ fontSize: '1rem', fontWeight: '600', color: '#1a1a2e' }}>{property.state}</div>
              </div>
              <div style={{ padding: '1rem', background: '#f9fafb', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>Status</div>
                <div style={{ fontSize: '1rem', fontWeight: '600', color: '#1a1a2e' }}>{property.status}</div>
              </div>
              <div style={{ padding: '1rem', background: '#f9fafb', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>Pincode</div>
                <div style={{ fontSize: '1rem', fontWeight: '600', color: '#1a1a2e' }}>{property.pincode}</div>
              </div>
              <div style={{ padding: '1rem', background: '#f9fafb', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>Seller</div>
                <div style={{ fontSize: '1rem', fontWeight: '600', color: '#1a1a2e' }}>{property.sellerName}</div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div>
          
          {/* Action Buttons */}
          <div style={{ 
            background: 'white', 
            padding: '1.5rem', 
            borderRadius: '12px', 
            border: '1px solid #e5e7eb', 
            marginBottom: '2rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
              <button 
                onClick={handleSave}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  background: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  fontSize: '0.9375rem',
                  transition: 'all 0.3s',
                  color: '#1a1a2e'
                }}
                onMouseEnter={(e) => e.target.style.background = '#f3f4f6'}
                onMouseLeave={(e) => e.target.style.background = '#fff'}
              >
                <Heart size={18} />
                Save
              </button>
              <button 
                onClick={handleShare}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  background: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  fontSize: '0.9375rem',
                  transition: 'all 0.3s',
                  color: '#1a1a2e'
                }}
                onMouseEnter={(e) => e.target.style.background = '#f3f4f6'}
                onMouseLeave={(e) => e.target.style.background = '#fff'}
              >
                <Share2 size={18} />
                Share
              </button>
            </div>
          </div>

          {/* Enquiry Form */}
          <div style={{ 
            background: 'white', 
            padding: '1.5rem', 
            borderRadius: '12px', 
            border: '1px solid #e5e7eb',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: '700', marginBottom: '0.5rem', color: '#1a1a2e' }}>
              Interested in this property?
            </h3>
            <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '1rem' }}>
              Send us your enquiry
            </p>
            
            <textarea 
              value={enquiryText}
              onChange={(e) => setEnquiryText(e.target.value)}
              placeholder="Tell us why you're interested..."
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '0.875rem',
                fontFamily: 'inherit',
                marginBottom: '1rem',
                minHeight: '120px',
                resize: 'vertical',
                boxSizing: 'border-box',
                outline: 'none'
              }}
              onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            />
            
            <button 
              onClick={handleEnquiry}
              style={{
                width: '100%',
                padding: '0.75rem',
                background: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontWeight: '600',
                cursor: 'pointer',
                fontSize: '0.9375rem',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => e.target.style.background = '#2563eb'}
              onMouseLeave={(e) => e.target.style.background = '#3b82f6'}
            >
              Send Enquiry
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}