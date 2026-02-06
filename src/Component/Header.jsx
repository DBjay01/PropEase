import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Header.css';

export default function Header() {
  // State to track if mobile menu is open or closed
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // State to store the user's role (ADMIN, SELLER, BUYER, or null)
  const [userRole, setUserRole] = useState(null);
  
  // Hooks for navigation and getting current page location
  const navigate = useNavigate();
  const location = useLocation();

  // Run when component loads - check if user is logged in
  useEffect(() => {
    try {
      // Get user data from localStorage
      const storedUser = localStorage.getItem('user');
      
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        setUserRole(userData?.role || null);
      } else {
        setUserRole(null);
      }
    } catch (error) {
      console.error('Error reading user data:', error);
      setUserRole(null);
    }
  }, []);

  // Toggle mobile menu open/close
  const toggleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close mobile menu when clicking a link
  const closeMobileMenu = () => {
    setIsMenuOpen(false);
  };

  // Handle login/logout button click
  const handleAuthClick = () => {
    if (userRole) {
      // User is logged in - log them out
      localStorage.removeItem('user');
      setUserRole(null);
      navigate('/');
    } else {
      // User is not logged in - go to login page
      navigate('/');
    }
  };

  // Check if a link is active (current page)
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="header">
      <div className="header-container">
        
        {/* Logo and Website Name */}
        <div className="logo-section">
          <img src="/logo2.png" alt="PropEase Logo" className="logo-image" />
          <span className="website-name">PropEase</span>
          {userRole && <span className="role-badge">{userRole}</span>}
        </div>

        {/* Mobile Menu Toggle Button */}
        <button 
          className="mobile-menu-button" 
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <div className={`hamburger-icon ${isMenuOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>

        {/* Navigation Menu */}
        <nav className={`nav-menu ${isMenuOpen ? 'show' : ''}`}>
          
          {/* Admin Navigation Links */}
          {userRole === 'ADMIN' && (
            <>
              <a
                href="/AdminDashboard"
                className={`nav-link ${isActive('/AdminDashboard') ? 'active' : ''}`}
                onClick={closeMobileMenu}
              >
                Dashboard
              </a>
              <a
                href="/AdminPropertyList"
                className={`nav-link ${isActive('/AdminPropertyList') ? 'active' : ''}`}
                onClick={closeMobileMenu}
              >
                Properties
              </a>
              <a
                href="/AdminUsersList"
                className={`nav-link ${isActive('/AdminUsersList') ? 'active' : ''}`}
                onClick={closeMobileMenu}
              >
                Users
              </a>
              <a
                href="/AdminProfile"
                className={`nav-link ${isActive('/AdminProfile') ? 'active' : ''}`}
                onClick={closeMobileMenu}
              >
                Profile
              </a>
            </>
          )}

          {/* Seller Navigation Links */}
          {userRole === 'SELLER' && (
            <>
              <a
                href="/SellerDashboard"
                className={`nav-link ${isActive('/SellerDashboard') ? 'active' : ''}`}
                onClick={closeMobileMenu}
              >
                Dashboard
              </a>
              <a
                href="/SellerPropertiesList"
                className={`nav-link ${isActive('/SellerPropertiesList') ? 'active' : ''}`}
                onClick={closeMobileMenu}
              >
                My Properties
              </a>
              <a
                href="/AddProperty"
                className={`nav-link ${isActive('/AddProperty') ? 'active' : ''}`}
                onClick={closeMobileMenu}
              >
                Add Property
              </a>
              <a
                href="/AdminProfile"
                className={`nav-link ${isActive('/AdminProfile') ? 'active' : ''}`}
                onClick={closeMobileMenu}
              >
                Profile
              </a>
            </>
          )}

          {/* Buyer/Guest Navigation Links */}
          {(!userRole || userRole === 'BUYER') && (
            <>
              <a
                href="/home"
                className={`nav-link ${isActive('/home') ? 'active' : ''}`}
                onClick={closeMobileMenu}
              >
                Home
              </a>
              <a
                href="/PropertyListing"
                className={`nav-link ${isActive('/PropertyListing') ? 'active' : ''}`}
                onClick={closeMobileMenu}
              >
                Properties
              </a>
              <a
                href="/BuyerDashboard"
                className={`nav-link ${isActive('/BuyerDashboard') ? 'active' : ''}`}
                onClick={closeMobileMenu}
              >
                Dashboard
              </a>
              <a
                href="/ContactUs"
                className={`nav-link ${isActive('/ContactUs') ? 'active' : ''}`}
                onClick={closeMobileMenu}
              >
                Contact
              </a>
              <a
                href="/BuyerProfile"
                className={`nav-link ${isActive('/BuyerProfile') ? 'active' : ''}`}
                onClick={closeMobileMenu}
              >
                Profile
              </a>
            </>
          )}
        </nav>

        {/* Login/Logout Button */}
        <button className="auth-button" onClick={handleAuthClick}>
          {userRole ? 'Log Out' : 'Log In'}
        </button>
      </div>
    </header>
  );
}