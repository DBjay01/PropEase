import React, { useState } from 'react';
import './ContactUs.css';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError('Please fill in all fields');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid email');
      return;
    }

    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    
    setTimeout(() => {
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="contact-us">
      <div className="contact-container">
        {/* Left Section - Form */}
        <div className="contact-form-section">
          <div className="form-header">
            <h1>Get in Touch</h1>
            <p>We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
          </div>

          {submitted && (
            <div className="success-message">
              ✓ Thank you! We'll get back to you soon.
            </div>
          )}

          {error && (
            <div className="error-message">
              ✕ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us how we can help..."
                rows="5"
                required
              ></textarea>
            </div>

            <button type="submit" className="submit-btn">
              Send Message
            </button>
          </form>
        </div>

        {/* Right Section - Contact Info */}
        <div className="contact-info-section">
          <div className="info-card">
            <div className="info-icon">
              <Phone size={24} />
            </div>
            <h3>Phone</h3>
            <p>+1 (555) 123-4567</p>
          </div>

          <div className="info-card">
            <div className="info-icon">
              <Mail size={24} />
            </div>
            <h3>Email</h3>
            <p>info@propease.com</p>
          </div>

          <div className="info-card">
            <div className="info-icon">
              <MapPin size={24} />
            </div>
            <h3>Address</h3>
            <p>123 Property Lane, Real City, RC 12345</p>
          </div>
        </div>
      </div>
    </div>
  );
}