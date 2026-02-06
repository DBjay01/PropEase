import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Heart, 
  Share2, 
  ChevronLeft, 
  ChevronRight, 
  Check,
  Calendar,
  Home,
  Star
} from 'lucide-react';
import { useParams } from 'react-router-dom';
import { fetchWithAuth } from '../../utils/api/fetchWithAuth';
import './PropertyDetailsPage.css';

export default function PropertyDetailsPage() {
  // Get property ID from URL
  const { propertyId } = useParams();
  
  // State for property data
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // State for UI interactions
  const [isSaved, setIsSaved] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [enquiryMessage, setEnquiryMessage] = useState('');

  // Fetch property data when component loads
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await fetchWithAuth(`http://localhost:8080/api/properties/${propertyId}`);
        if (!response.ok) throw new Error('Failed to fetch property');
        const data = await response.json();
        setProperty(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProperty();
  }, [propertyId]);

  // Helper function to get user ID from localStorage
  const getUserId = () => {
    try {
      const stored = localStorage.getItem('user');
      if (!stored) return null;
      const user = JSON.parse(stored);
      return user?.userId || user?.id || user?.user_id || null;
    } catch {
      return null;
    }
  };

  // Handle saving/liking property
  const handleSaveProperty = async () => {
    const userId = getUserId();
    
    if (!userId) {
      alert('Please login to save this property.');
      return;
    }

    const propertyIdToUse = property?.propertyId || property?.property_id || Number(propertyId);

    try {
      const response = await fetchWithAuth(
        `http://localhost:8080/api/property-likes/${userId}/${propertyIdToUse}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({})
        }
      );

      if (!response.ok) {
        throw new Error('Failed to save property');
      }

      setIsSaved(!isSaved);
      alert('Property saved successfully!');
    } catch (err) {
      alert(err.message || 'Error saving property');
    }
  };

  // Handle submitting enquiry
  const handleSubmitEnquiry = async () => {
    if (!enquiryMessage.trim()) {
      alert('Please enter a message');
      return;
    }

    const userId = getUserId();
    
    if (!userId) {
      alert('Please login to submit an enquiry.');
      return;
    }

    const payload = {
      propertyId: property?.propertyId || property?.property_id || Number(propertyId),
      userId: userId,
      message: enquiryMessage
    };

    try {
      const response = await fetchWithAuth('http://localhost:8080/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('Failed to submit enquiry');
      }

      alert('Enquiry submitted successfully!');
      setEnquiryMessage('');
    } catch (err) {
      alert(err.message || 'Error submitting enquiry');
    }
  };

  // Image navigation functions
  const goToPreviousImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? displayImages.length - 1 : prev - 1
    );
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === displayImages.length - 1 ? 0 : prev + 1
    );
  };

  // Format price in Indian currency
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', { 
      style: 'currency', 
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  // Show loading state
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading property details...</p>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="error-container">
        <p>Error: {error}</p>
      </div>
    );
  }

  // Show not found state
  if (!property) {
    return (
      <div className="error-container">
        <p>Property not found</p>
      </div>
    );
  }

  // Get images or use placeholder
  const displayImages = property.images && property.images.length > 0 
    ? property.images 
    : ['https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1200&q=80'];

  // Property features for display
  const propertyFeatures = [
    { 
      icon: '🏡', 
      title: 'Property Type', 
      value: property.propertyType 
    },
    { 
      icon: '📍', 
      title: 'Location', 
      value: `${property.city}, ${property.state}` 
    },
    { 
      icon: '📮', 
      title: 'Pincode', 
      value: property.pincode 
    },
    { 
      icon: '✅', 
      title: 'Status', 
      value: property.status 
    },
    { 
      icon: '📅', 
      title: 'Listed On', 
      value: new Date(property.createdAt).toLocaleDateString() 
    },
    { 
      icon: '👤', 
      title: 'Seller', 
      value: property.sellerName || 'Owner' 
    }
  ];

  // Amenities list
  const amenities = [
    'Well Maintained',
    'Modern Fixtures',
    'Good Ventilation',
    'Security System',
    'Parking Available',
    'Gated Community',
    'Water Supply',
    'Electricity Connection',
    'Close to Schools',
    'Shopping Nearby',
    'Public Transport',
    'Parks & Recreation'
  ];

  return (
    <div className="property-details-page">
      {/* Breadcrumb Navigation */}
      <div className="breadcrumb">
        <div className="breadcrumb-container">
          <a href="/" className="breadcrumb-link">Home</a>
          <span className="breadcrumb-separator">/</span>
          <a href="/PropertyListing" className="breadcrumb-link">Properties</a>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">{property.title}</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="property-content">
        <div className="content-container">
          
          {/* Left Column - Images and Details */}
          <div className="left-column">
            
            {/* Image Gallery */}
            <div className="image-gallery">
              <img 
                src={displayImages[currentImageIndex]} 
                alt={property.title}
                className="main-image"
              />
              
              {/* Previous Button */}
              <button 
                className="nav-button prev-button"
                onClick={goToPreviousImage}
              >
                <ChevronLeft size={24} />
              </button>
              
              {/* Next Button */}
              <button 
                className="nav-button next-button"
                onClick={goToNextImage}
              >
                <ChevronRight size={24} />
              </button>
              
              {/* Image Indicators */}
              <div className="image-indicators">
                {displayImages.map((_, index) => (
                  <button
                    key={index}
                    className={`indicator ${index === currentImageIndex ? 'active' : ''}`}
                    onClick={() => setCurrentImageIndex(index)}
                  />
                ))}
              </div>
            </div>

            {/* Thumbnail Gallery */}
            {displayImages.length > 1 && (
              <div className="thumbnail-gallery">
                {displayImages.map((image, index) => (
                  <div
                    key={index}
                    className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                    onClick={() => setCurrentImageIndex(index)}
                  >
                    <img src={image} alt={`View ${index + 1}`} />
                  </div>
                ))}
              </div>
            )}

            {/* Property Description */}
            <div className="description-section">
              <h2 className="section-title">About this property</h2>
              <p className="description-text">
                {property.description || 
                  `A beautiful ${property.propertyType.toLowerCase()} located in ${property.city}, ${property.state}. 
                  This property is available for purchase at an asking price of ${formatPrice(property.price)}. 
                  The property offers modern amenities and is situated in a prime location with easy access to 
                  essential services and facilities.`
                }
              </p>
            </div>

            {/* Key Features */}
            <div className="features-section">
              <h2 className="section-title">Key Details</h2>
              <div className="features-grid">
                {propertyFeatures.map((feature, index) => (
                  <div key={index} className="feature-card">
                    <div className="feature-icon">{feature.icon}</div>
                    <div className="feature-info">
                      <div className="feature-label">{feature.title}</div>
                      <div className="feature-value">{feature.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div className="amenities-section">
              <h2 className="section-title">Amenities & Features</h2>
              <div className="amenities-grid">
                {amenities.map((amenity, index) => (
                  <div key={index} className="amenity-item">
                    <Check size={18} className="check-icon" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column - Property Info & Actions */}
          <div className="right-column">
            
            {/* Property Header Card */}
            <div className="property-header-card">
              <div className="price-tag">{formatPrice(property.price)}</div>
              <h1 className="property-title">{property.title}</h1>
              
              <div className="location-info">
                <MapPin size={18} />
                <span>{property.city}, {property.state} - {property.pincode}</span>
              </div>

              {/* Action Buttons */}
              <div className="action-buttons">
                <button 
                  className={`action-btn ${isSaved ? 'saved' : ''}`}
                  onClick={handleSaveProperty}
                  title="Save property"
                >
                  <Heart size={20} fill={isSaved ? 'currentColor' : 'none'} />
                  <span>{isSaved ? 'Saved' : 'Save'}</span>
                </button>
                <button 
                  className="action-btn"
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: property.title,
                        url: window.location.href
                      });
                    } else {
                      alert('Share link copied!');
                    }
                  }}
                  title="Share property"
                >
                  <Share2 size={20} />
                  <span>Share</span>
                </button>
              </div>
            </div>

            {/* Quick Info Cards */}
            <div className="quick-info-section">
              <div className="info-card">
                <Home size={20} className="info-icon" />
                <div className="info-content">
                  <div className="info-label">Property Type</div>
                  <div className="info-value">{property.propertyType}</div>
                </div>
              </div>

              <div className="info-card">
                <Check size={20} className="info-icon" />
                <div className="info-content">
                  <div className="info-label">Status</div>
                  <div className="info-value">{property.status}</div>
                </div>
              </div>

              <div className="info-card">
                <Calendar size={20} className="info-icon" />
                <div className="info-content">
                  <div className="info-label">Listed On</div>
                  <div className="info-value">
                    {new Date(property.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>

            {/* Enquiry Form */}
            <div className="enquiry-card">
              <h3 className="card-title">Interested in this property?</h3>
              <p className="card-subtitle">Send us your enquiry and we'll get back to you soon</p>
              
              <div className="form-group">
                <label className="form-label">Your Message</label>
                <textarea
                  className="form-textarea"
                  value={enquiryMessage}
                  onChange={(e) => setEnquiryMessage(e.target.value)}
                  placeholder="I'm interested in this property. Please provide more details..."
                  rows="5"
                />
              </div>

              <button 
                className="submit-button"
                onClick={handleSubmitEnquiry}
              >
                Send Enquiry
              </button>
            </div>

            {/* Contact Info Card */}
            <div className="contact-card">
              <h3 className="card-title">Property Owner</h3>
              <div className="owner-info">
                <div className="owner-avatar">
                  {(property.sellerName || 'O')[0].toUpperCase()}
                </div>
                <div className="owner-details">
                  <div className="owner-name">{property.sellerName || 'Owner'}</div>
                  <div className="owner-label">Property Seller</div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}