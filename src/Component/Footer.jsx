import React, { useState } from 'react';
import { Facebook, Twitter, Instagram, Linkedin, ArrowRight } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleSubscribe = () => {
    console.log('Subscribe with email:', email);
    setEmail('');
  };

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .footer {
          background: #f9fafb;
          padding: 4rem 2rem 2rem;
          border-top: 1px solid #e5e7eb;
        }

        .footer-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .footer-content {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1.5fr;
          gap: 3rem;
          margin-bottom: 3rem;
        }

        .footer-brand {
          display: flex;
          flex-direction: column;
        }

        .logo-section {
          display: flex;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .logo-circle {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #22d3ee 0%, #3b82f6 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 10px;
          flex-shrink: 0;
        }

        .logo-circle-inner {
          width: 28px;
          height: 28px;
          border: 2px solid white;
          border-radius: 50%;
        }

        .logo-text {
          font-size: 1.25rem;
          font-weight: 700;
          color: #1a1a2e;
        }

        .logo-domain {
          font-size: 0.875rem;
          color: #6b7280;
          margin-left: 2px;
        }

        .footer-description {
          color: #6b7280;
          font-size: 0.875rem;
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }

        .social-links {
          display: flex;
          gap: 1rem;
        }

        .social-link {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: white;
          border: 1px solid #e5e7eb;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
        }

        .social-link:hover {
          background: #3b82f6;
          border-color: #3b82f6;
        }

        .social-link:hover svg {
          color: white;
        }

        .social-icon {
          color: #6b7280;
          transition: color 0.3s ease;
        }

        .footer-column {
          display: flex;
          flex-direction: column;
        }

        .footer-column-title {
          font-size: 1.125rem;
          font-weight: 700;
          color: #1a1a2e;
          margin-bottom: 1.5rem;
        }

        .footer-links {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .footer-link {
          color: #6b7280;
          text-decoration: none;
          font-size: 0.875rem;
          transition: color 0.3s ease;
        }

        .footer-link:hover {
          color: #3b82f6;
        }

        .footer-subscribe {
          display: flex;
          flex-direction: column;
        }

        .subscribe-title {
          font-size: 1.125rem;
          font-weight: 700;
          color: #1a1a2e;
          margin-bottom: 0.75rem;
        }

        .subscribe-description {
          color: #6b7280;
          font-size: 0.875rem;
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }

        .subscribe-form {
          display: flex;
          gap: 0.5rem;
        }

        .subscribe-input {
          flex: 1;
          padding: 0.75rem 1rem;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          font-size: 0.875rem;
          outline: none;
          transition: border-color 0.3s ease;
        }

        .subscribe-input:focus {
          border-color: #3b82f6;
        }

        .subscribe-input::placeholder {
          color: #9ca3af;
        }

        .subscribe-button {
          width: 45px;
          height: 45px;
          background: #3b82f6;
          border: none;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.3s ease;
          flex-shrink: 0;
        }

        .subscribe-button:hover {
          background: #2563eb;
        }

        .subscribe-icon {
          color: white;
        }

        .footer-bottom {
          padding-top: 2rem;
          border-top: 1px solid #e5e7eb;
          text-align: center;
        }

        .footer-copyright {
          color: #6b7280;
          font-size: 0.875rem;
        }

        @media (max-width: 968px) {
          .footer-content {
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
          }

          .footer-brand {
            grid-column: 1 / -1;
          }

          .footer-subscribe {
            grid-column: 1 / -1;
          }
        }

        @media (max-width: 640px) {
          .footer {
            padding: 3rem 1.5rem 1.5rem;
          }

          .footer-content {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .footer-column,
          .footer-subscribe {
            grid-column: 1;
          }

          .subscribe-form {
            flex-direction: column;
          }

          .subscribe-button {
            width: 100%;
          }
        }
      `}</style>

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-content">
            {/* Brand Section */}
            <div className="footer-brand">
              <div className="logo-section">
                <div className="logo-circle">
                  <div className="logo-circle-inner"></div>
                </div>
                <div>
                  <span className="logo-text">logoipsum</span>
                  <span className="logo-domain">.com</span>
                </div>
              </div>
              <p className="footer-description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <div className="social-links">
                <a href="#" className="social-link">
                  <Facebook size={20} className="social-icon" />
                </a>
                <a href="#" className="social-link">
                  <Twitter size={20} className="social-icon" />
                </a>
                <a href="#" className="social-link">
                  <Instagram size={20} className="social-icon" />
                </a>
                <a href="#" className="social-link">
                  <Linkedin size={20} className="social-icon" />
                </a>
              </div>
            </div>

            {/* Take a tour Column */}
            <div className="footer-column">
              <h3 className="footer-column-title">Take a tour</h3>
              <div className="footer-links">
                <a href="#" className="footer-link">Features</a>
                <a href="#" className="footer-link">Partners</a>
                <a href="#" className="footer-link">Pricing</a>
                <a href="#" className="footer-link">Product</a>
                <a href="#" className="footer-link">Support</a>
              </div>
            </div>

            {/* Our Company Column */}
            <div className="footer-column">
              <h3 className="footer-column-title">Our Company</h3>
              <div className="footer-links">
                <a href="#" className="footer-link">About Us</a>
                <a href="#" className="footer-link">Agents</a>
                <a href="#" className="footer-link">Blog</a>
                <a href="#" className="footer-link">Media</a>
                <a href="#" className="footer-link">Contact Us</a>
              </div>
            </div>

            {/* Subscribe Column */}
            <div className="footer-subscribe">
              <h3 className="subscribe-title">Subscribe</h3>
              <p className="subscribe-description">
                Subscribe to get latest property, blog news from us
              </p>
              <div className="subscribe-form">
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  className="subscribe-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button className="subscribe-button" onClick={handleSubscribe}>
                  <ArrowRight size={20} className="subscribe-icon" />
                </button>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="footer-bottom">
            <p className="footer-copyright">© 2021. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}