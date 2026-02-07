import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Bell, Search, Eye, MapPin, LogOut } from 'lucide-react';

export default function BuyerDashboard() {
  const navigate = useNavigate();
  const [savedPropertiesCount, setSavedPropertiesCount] = useState(0);
  const [savedProperties, setSavedProperties] = useState([]);
  const [propertyViewCounts, setPropertyViewCounts] = useState([]);
  const [totalViewCount, setTotalViewCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState('U');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Extract user from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('user');
      const token = localStorage.getItem('token');
      
      if (!stored || !token) {
        navigate('/login');
        return;
      }

      const user = JSON.parse(stored);
      const id = user?.id || user?.userId || user?.user_id || user?.buyerId;
      const name = user?.name || user?.username || user?.firstName || 'User';
      
      if (!id) {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        navigate('/login');
        return;
      }
      
      setUserId(id);
      setUserName(String(name).charAt(0).toUpperCase());
      setIsAuthenticated(true);
      console.log('User authenticated:', id);
    } catch (err) {
      console.error('Auth error:', err);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      navigate('/login');
    }
  }, [navigate]);

  // Fetch saved properties
  useEffect(() => {
    if (!userId || !isAuthenticated) return;

    const fetchSavedProperties = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:8080/api/property-likes/buyer/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (!response.ok) {
          if (response.status === 401 || response.status === 403) {
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            navigate('/login');
            return;
          }
          throw new Error(`Failed: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Saved properties data:', data);
        setSavedPropertiesCount(data.length || 0);
        setSavedProperties(data || []);
      } catch (err) {
        console.error('Error fetching saved properties:', err);
        setSavedPropertiesCount(0);
        setSavedProperties([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedProperties();
  }, [userId, isAuthenticated, navigate]);

  // Track property views
  useEffect(() => {
    if (!userId || !isAuthenticated || savedProperties.length === 0) return;

    const trackViews = async () => {
      for (const like of savedProperties) {
        const propertyId = like.property?.id || like.propertyId;
        if (!propertyId) continue;

        try {
          const token = localStorage.getItem('token');
          await fetch('http://localhost:8080/api/properties/view', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              propertyId: propertyId,
              buyerId: userId,
              viewDate: new Date().toISOString()
            })
          });
        } catch (err) {
          console.error('Error tracking view:', err);
        }
      }
    };

    trackViews();
  }, [userId, isAuthenticated, savedProperties]);

  // Fetch view counts
  useEffect(() => {
    if (!userId || !isAuthenticated) return;

    const fetchViewCounts = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:8080/api/properties/sellers/${userId}/viewsCount`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (response.ok) {
          const viewCounts = await response.json();
          setPropertyViewCounts(viewCounts || []);
          
          const total = (viewCounts || []).reduce((sum, item) => sum + (item.viewCount || 0), 0);
          setTotalViewCount(total);
          console.log('View counts:', viewCounts);
        } else if (response.status === 401 || response.status === 403) {
          localStorage.removeItem('user');
          localStorage.removeItem('token');
          navigate('/login');
        } else {
          setPropertyViewCounts([]);
          setTotalViewCount(0);
        }
      } catch (err) {
        console.error('Error fetching view counts:', err);
        setPropertyViewCounts([]);
        setTotalViewCount(0);
      }
    };

    fetchViewCounts();
  }, [userId, isAuthenticated, navigate]);

  const formatPrice = (price) => {
    if (!price) return '₹0';
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(price);
  };

  const stats = [
    { label: 'Saved Properties', value: savedPropertiesCount, icon: Heart, color: '#ef4444' },
    { label: 'Property Views', value: totalViewCount, icon: Eye, color: '#10b981' }
  ];

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handlePropertyClick = (property) => {
    console.log('Navigating to property:', property);
    const propertyId = property?.id || property?.propertyId;
    if (propertyId) {
      navigate(`/PropertyDetailsPage/${propertyId}`, { state: { property } });
    }
  };

  if (!isAuthenticated || loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: '18px', color: '#6b7280' }}>
        ⏳ Loading...
      </div>
    );
  }

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
          background: #f9fafb;
        }

        .dashboard {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          background: #f9fafb;
          width: 100%;
        }

        .top-bar {
          background: white;
          border-bottom: 1px solid #e5e7eb;
          padding: 1.5rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: sticky;
          top: 0;
          z-index: 50;
          gap: 1rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
        }

        .search-bar {
          flex: 1;
          max-width: 400px;
          position: relative;
          min-width: 0;
        }

        .search-input {
          width: 100%;
          padding: 0.75rem 1rem 0.75rem 3rem;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          font-size: 0.875rem;
          outline: none;
          transition: border-color 0.3s ease;
          background: #f9fafb;
        }

        .search-input:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
          background: white;
        }

        .search-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: #9ca3af;
          pointer-events: none;
          width: 18px;
          height: 18px;
          flex-shrink: 0;
        }

        .top-bar-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-left: auto;
        }

        .icon-button {
          width: 40px;
          height: 40px;
          background: #f3f4f6;
          border: none;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          flex-shrink: 0;
          color: #6b7280;
        }

        .icon-button:hover {
          background: #e5e7eb;
          color: #1a1a2e;
        }

        .notification-badge {
          position: absolute;
          top: -8px;
          right: -8px;
          width: 18px;
          height: 18px;
          background: #ef4444;
          color: white;
          border-radius: 50%;
          font-size: 0.625rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid white;
        }

        .user-avatar {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 700;
          cursor: pointer;
          font-size: 0.875rem;
          flex-shrink: 0;
        }

        .user-avatar:hover {
          opacity: 0.9;
        }

        .main-content {
          flex: 1;
          padding: 2rem;
          overflow-y: auto;
        }

        .page-header {
          margin-bottom: 2rem;
        }

        .page-title {
          font-size: 2rem;
          font-weight: 700;
          color: #1a1a2e;
          margin-bottom: 0.5rem;
        }

        .page-subtitle {
          color: #6b7280;
          font-size: 1rem;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .stat-card {
          background: white;
          padding: 1.5rem;
          border-radius: 16px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          display: flex;
          align-items: center;
          gap: 1rem;
          transition: all 0.3s ease;
          border: 1px solid #e5e7eb;
        }

        .stat-card:hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          transform: translateY(-2px);
        }

        .stat-icon {
          width: 56px;
          height: 56px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .stat-content {
          flex: 1;
        }

        .stat-value {
          font-size: 1.75rem;
          font-weight: 700;
          color: #1a1a2e;
          margin-bottom: 0.25rem;
        }

        .stat-label {
          font-size: 0.875rem;
          color: #6b7280;
          font-weight: 500;
        }

        .dashboard-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
          margin-bottom: 2rem;
        }

        .card {
          background: white;
          padding: 1.5rem;
          border-radius: 16px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          border: 1px solid #e5e7eb;
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #f0f0f0;
        }

        .card-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #1a1a2e;
        }

        .view-all-link {
          color: #3b82f6;
          font-size: 0.875rem;
          font-weight: 600;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.3s ease;
          padding: 0.5rem 1rem;
          border-radius: 8px;
        }

        .view-all-link:hover {
          text-decoration: underline;
          color: #2563eb;
          background: #eff6ff;
        }

        .property-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .property-item {
          display: flex;
          gap: 1rem;
          padding: 1rem;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          transition: all 0.3s ease;
          cursor: pointer;
          align-items: center;
          background: #fafafa;
        }

        .property-item:hover {
          border-color: #3b82f6;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.1);
          background: white;
          transform: translateX(4px);
        }

        .property-image-small {
          width: 80px;
          height: 80px;
          border-radius: 8px;
          object-fit: cover;
          flex-shrink: 0;
          border: 1px solid #e5e7eb;
        }

        .property-info {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .property-name {
          font-size: 0.9375rem;
          font-weight: 600;
          color: #1a1a2e;
          line-height: 1.4;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .property-location-small {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #6b7280;
          font-size: 0.8125rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .property-location-small svg {
          flex-shrink: 0;
          min-width: 14px;
        }

        .property-price-small {
          font-size: 1rem;
          font-weight: 700;
          color: #3b82f6;
        }

        .status-badge {
          padding: 0.375rem 0.75rem;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
          white-space: nowrap;
          flex-shrink: 0;
        }

        .status-available {
          background: #d1fae5;
          color: #065f46;
        }

        .status-pending {
          background: #fef3c7;
          color: #92400e;
        }

        .empty-state {
          text-align: center;
          padding: 3rem 2rem;
          color: #6b7280;
          font-size: 1rem;
        }

        .loading-state {
          text-align: center;
          padding: 3rem 2rem;
          color: #6b7280;
          font-style: italic;
        }

        .views-count-container {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 1rem;
          margin-top: 1rem;
        }

        .views-count-item {
          background: linear-gradient(135deg, #f0f9ff 0%, #f5f3ff 100%);
          padding: 1rem;
          border-radius: 12px;
          border-left: 4px solid #3b82f6;
          transition: all 0.3s ease;
        }

        .views-count-item:hover {
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
          transform: translateY(-2px);
        }

        .views-count-property-name {
          font-size: 0.875rem;
          font-weight: 600;
          color: #1a1a2e;
          margin-bottom: 0.5rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .views-count-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.375rem;
          background: #3b82f6;
          color: white;
          padding: 0.375rem 0.75rem;
          border-radius: 8px;
          font-size: 0.75rem;
          font-weight: 700;
        }

        @media (max-width: 1024px) {
          .stats-grid {
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          }

          .views-count-container {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .top-bar {
            padding: 1rem;
            gap: 0.5rem;
          }

          .search-bar {
            max-width: none;
            flex: 1;
          }

          .search-input {
            font-size: 0.75rem;
            padding: 0.5rem 0.75rem 0.5rem 2.5rem;
          }

          .main-content {
            padding: 1rem;
          }

          .page-title {
            font-size: 1.5rem;
          }

          .page-subtitle {
            font-size: 0.875rem;
          }

          .stats-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .stat-card {
            padding: 1rem;
          }

          .stat-icon {
            width: 48px;
            height: 48px;
          }

          .stat-value {
            font-size: 1.5rem;
          }

          .stat-label {
            font-size: 0.8rem;
          }

          .dashboard-grid {
            gap: 1rem;
          }

          .card {
            padding: 1rem;
          }

          .card-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }

          .card-title {
            font-size: 1rem;
          }

          .property-image-small {
            width: 60px;
            height: 60px;
          }

          .property-name {
            font-size: 0.875rem;
          }

          .property-location-small {
            font-size: 0.75rem;
          }

          .property-price-small {
            font-size: 0.875rem;
          }

          .views-count-container {
            grid-template-columns: 1fr;
          }

          .view-all-link {
            padding: 0.375rem 0.75rem;
          }
        }

        @media (max-width: 480px) {
          .top-bar {
            padding: 0.75rem;
            flex-wrap: wrap;
          }

          .search-bar {
            order: 3;
            flex-basis: 100%;
            margin-top: 0.5rem;
          }

          .search-input {
            font-size: 0.7rem;
          }

          .main-content {
            padding: 0.75rem;
          }

          .page-title {
            font-size: 1.25rem;
          }

          .page-header {
            margin-bottom: 1rem;
          }

          .property-item {
            flex-direction: column;
            align-items: flex-start;
            padding: 0.75rem;
          }

          .property-image-small {
            width: 100%;
            height: 150px;
          }

          .card {
            padding: 0.75rem;
          }

          .card-header {
            padding-bottom: 0.5rem;
          }

          .views-count-container {
            gap: 0.75rem;
          }
        }
      `}</style>

      <div className="dashboard">
        {/* Top Bar */}
        <div className="top-bar">
          <div style={{ fontSize: '1.25rem', fontWeight: '700', color: '#1a1a2e' }}>propEase</div>

          <div className="search-bar">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search properties..."
              className="search-input"
            />
          </div>

          <div className="top-bar-actions">
            <button className="icon-button" title="Notifications">
              <Bell size={20} />
              <span className="notification-badge">3</span>
            </button>
            <div className="user-avatar" title="User profile">{userName}</div>
            <button 
              className="icon-button" 
              title="Logout"
              onClick={handleLogout}
              style={{ marginLeft: '0.5rem' }}
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="main-content">
          <div className="page-header">
            <h1 className="page-title">Welcome back!</h1>
            <p className="page-subtitle">Here's what's happening with your property search</p>
          </div>

          {/* Stats Grid */}
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-icon" style={{ background: `${stat.color}15` }}>
                  <stat.icon size={24} style={{ color: stat.color }} />
                </div>
                <div className="stat-content">
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Dashboard Grid */}
          <div className="dashboard-grid">
            {/* Saved Properties Card */}
            <div className="card">
              <div className="card-header">
                <h2 className="card-title">Saved Properties</h2>
                <a href="#" className="view-all-link">View All →</a>
              </div>
              {loading ? (
                <div className="loading-state">Loading saved properties...</div>
              ) : savedProperties.length > 0 ? (
                <div className="property-list">
                  {savedProperties.slice(0, 5).map((like, idx) => {
                    // Extract property data properly
                    const property = like.property || like;
                    const propertyId = property?.id || property?.propertyId || property?.property_id;
                    const title = property?.title || property?.name || 'Property';
                    const city = property?.city || 'Unknown';
                    const state = property?.state || '';
                    const price = property?.price || 0;
                    const status = property?.status || 'PENDING';
                    const images = property?.images || [];
                    
                    let imageUrl = 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&q=80';
                    if (images.length > 0) {
                      imageUrl = images[0]?.imageUrl || images[0]?.url || images[0];
                    }
                    
                    return (
                      <div 
                        key={`${idx}-${propertyId}`}
                        className="property-item"
                        onClick={() => handlePropertyClick(property)}
                      >
                        <img 
                          src={imageUrl} 
                          alt={title} 
                          className="property-image-small" 
                          onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&q=80'} 
                        />
                        <div className="property-info">
                          <div className="property-name">{title}</div>
                          <div className="property-location-small">
                            <MapPin size={14} />
                            <span>{city}, {state}</span>
                          </div>
                          <div className="property-price-small">{formatPrice(price)}</div>
                        </div>
                        <span className={`status-badge ${status === 'AVAILABLE' ? 'status-available' : 'status-pending'}`}>
                          {status}
                        </span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="empty-state">📌 No saved properties yet. Start exploring!</div>
              )}
            </div>
          </div>

          {/* View Analytics Section */}
          {propertyViewCounts.length > 0 && (
            <div className="card">
              <div className="card-header">
                <h2 className="card-title">Property View Analytics</h2>
                <span style={{ fontSize: '0.875rem', color: '#6b7280', fontWeight: '500' }}>
                  Total: <strong style={{ color: '#10b981', fontSize: '1rem' }}>{totalViewCount}</strong>
                </span>
              </div>
              <div className="views-count-container">
                {propertyViewCounts.map((item, idx) => (
                  <div key={idx} className="views-count-item">
                    <div className="views-count-property-name">
                      Property ID: {item.propertyId}
                    </div>
                    <div className="views-count-badge">
                      <Eye size={12} />
                      {item.viewCount || 0} views
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}