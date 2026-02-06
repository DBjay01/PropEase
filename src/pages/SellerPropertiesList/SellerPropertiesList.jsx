import React, { useState, useEffect } from 'react';
import { fetchWithAuth } from '../../utils/api/fetchWithAuth';
import styles from './SellerPropertiesList.module.css';

export default function SellerPropertiesList() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('All');

  const filteredProperties = filter === 'All' 
    ? properties 
    : properties.filter(prop => prop.status === filter);

  const getSellerIdFromStorage = () => {
    try {
      const st = localStorage.getItem('user');
      if (!st) return null;
      const u = JSON.parse(st);
      return u?.id ?? u?.userId ?? u?.sellerId ?? null;
    } catch {
      return null;
    }
  };

  const handleView = (id) => {
    window.location.href = `/PropertyDetailsPage/${id}`;
  };

  const handleEdit = (id) => {
    window.location.href = `/AddProperty?edit=${id}`;
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this property?')) return;
    try {
      const res = await fetchWithAuth(`http://localhost:8080/api/properties/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error(`Delete failed: ${res.status}`);
      setProperties(prev => prev.filter(p => p.id !== id));
    } catch (e) {
      alert(e.message || 'Failed to delete');
    }
  };

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError('');
      const sellerId = getSellerIdFromStorage();
      if (!sellerId) {
        setError('Seller ID not found. Please login as a seller.');
        setLoading(false);
        return;
      }

      try {
        const res = await fetchWithAuth(`http://localhost:8080/api/properties/seller/${sellerId}`);
        if (!res.ok) throw new Error(`Failed to load properties: ${res.status}`);
        const data = await res.json();

        const mapped = (Array.isArray(data) ? data : []).map(item => ({
          id: item.propertyId,
          title: item.title,
          address: `${item.city ?? ''}${item.city && item.state ? ', ' : ''}${item.state ?? ''}${item.pincode ? ' - ' + item.pincode : ''}`,
          price: `₹${Number(item.price ?? 0).toLocaleString('en-IN')}`,
          bedrooms: item.bedrooms ?? '-',
          bathrooms: item.bathrooms ?? '-',
          sqft: item.sqft ?? '-',
          status: item.status === 'AVAILABLE' ? 'Active' : item.status === 'SOLD' ? 'Sold' : 'Pending',
          views: item.views ?? 0,
          inquiries: item.inquiries ?? 0,
          image: item.imageUrl || 'https://via.placeholder.com/800x600?text=No+Image'
        }));

        setProperties(mapped);
      } catch (err) {
        setError(err?.message || 'Error loading properties');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <>
      <link 
        href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.2/css/bootstrap.min.css" 
        rel="stylesheet"
      />
      <link 
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
        rel="stylesheet"
      />

      <div className={styles.sellerPropertiesPage}>
        {/* Page Header */}
        <section className={styles.pageHeader}>
          <div className={styles.headerContent}>
            <h1 className={styles.pageTitle}>My Properties</h1>
            <p className={styles.pageSubtitle}>Manage and track all your property listings in one place</p>
          </div>
        </section>

        {/* Content Section */}
        <section className={styles.contentSection}>
          <div className={styles.contentContainer}>
            {/* Filter Bar */}
            <div className={styles.filterBar}>
              <div className={styles.filterButtonsWrapper}>
                <button 
                  className={`${styles.filterBtn} ${filter === 'All' ? styles.active : ''}`}
                  onClick={() => setFilter('All')}
                >
                  All Properties
                </button>
                <button 
                  className={`${styles.filterBtn} ${filter === 'Active' ? styles.active : ''}`}
                  onClick={() => setFilter('Active')}
                >
                  Active
                </button>
                <button 
                  className={`${styles.filterBtn} ${filter === 'Pending' ? styles.active : ''}`}
                  onClick={() => setFilter('Pending')}
                >
                  Pending
                </button>
                <button 
                  className={`${styles.filterBtn} ${filter === 'Sold' ? styles.active : ''}`}
                  onClick={() => setFilter('Sold')}
                >
                  Sold
                </button>
              </div>
              <a href="/AddProperty">
                <button className={styles.addPropertyBtn}>
                  <i className="fas fa-plus"></i>
                  Add New Property
                </button>
              </a>
            </div>

            {/* Properties Grid */}
            {loading && (
              <div className={styles.loadingMessage}>
                <p>Loading properties...</p>
              </div>
            )}
            
            {error && (
              <div className={styles.errorMessage}>
                <p>{error}</p>
              </div>
            )}

            {!loading && !error && (
              <div className={styles.propertiesGrid}>
                {filteredProperties.length > 0 ? (
                  filteredProperties.map(property => (
                    <div key={property.id} className={styles.propertyCard}>
                      <div className={styles.propertyImageWrapper}>
                        <img src={property.image} alt={property.title} className={styles.propertyImage} />
                        <span className={`${styles.statusBadge} ${styles[property.status.toLowerCase()]}`}>
                          {property.status}
                        </span>
                      </div>
                      <div className={styles.propertyDetails}>
                        <h3 className={styles.propertyTitle}>{property.title}</h3>
                        <p className={styles.propertyAddress}>
                          <i className="fas fa-map-marker-alt"></i>
                          {property.address}
                        </p>
                        <div className={styles.propertyPrice}>{property.price}</div>
                        <div className={styles.propertyFeatures}>
                          <div className={styles.featureItem}>
                            <i className="fas fa-bed"></i>
                            <span>{property.bedrooms} Beds</span>
                          </div>
                          <div className={styles.featureItem}>
                            <i className="fas fa-bath"></i>
                            <span>{property.bathrooms} Baths</span>
                          </div>
                          <div className={styles.featureItem}>
                            <i className="fas fa-ruler-combined"></i>
                            <span>{property.sqft} sqft</span>
                          </div>
                        </div>
                        <div className={styles.propertyStats}>
                          <div className={styles.statItem}>
                            <div className={styles.statNumber}>{property.views}</div>
                            <div className={styles.statLabel}>Views</div>
                          </div>
                          <div className={styles.statItem}>
                            <div className={styles.statNumber}>{property.inquiries}</div>
                            <div className={styles.statLabel}>Inquiries</div>
                          </div>
                        </div>

                        {/* Action buttons */}
                        <div className={styles.actionButtons}>
                          <button className={`${styles.actionBtn} ${styles.viewBtn}`} onClick={() => handleView(property.id)}>
                            <i className="fas fa-eye"></i>
                            View
                          </button>
                          <button className={`${styles.actionBtn} ${styles.editBtn}`} onClick={() => handleEdit(property.id)}>
                            <i className="fas fa-edit"></i>
                            Edit
                          </button>
                          <button className={`${styles.actionBtn} ${styles.deleteBtn}`} onClick={() => handleDelete(property.id)}>
                            <i className="fas fa-trash"></i>
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className={styles.loadingMessage}>
                    <p>No properties found.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}