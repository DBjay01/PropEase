import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, User, Phone } from 'lucide-react';

export default function RegistrationPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    console.log('Registration attempt:', formData);
  };

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
        }

        .register-page {
          min-height: 100vh;
          display: grid;
          grid-template-columns: 1fr 1fr;
          background: white;
        }

        .register-left {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 3rem;
        }

        .register-form-container {
          width: 100%;
          max-width: 450px;
        }

        .logo-section {
          display: flex;
          align-items: center;
          margin-bottom: 3rem;
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
        }

        .logo-circle-inner {
          width: 28px;
          height: 28px;
          border: 2px solid white;
          border-radius: 50%;
        }

        .logo-text {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1a1a2e;
        }

        .register-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: #1a1a2e;
          margin-bottom: 0.5rem;
        }

        .register-subtitle {
          color: #6b7280;
          font-size: 1rem;
          margin-bottom: 2.5rem;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-label {
          display: block;
          font-size: 0.875rem;
          font-weight: 600;
          color: #1a1a2e;
          margin-bottom: 0.5rem;
        }

        .input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-icon {
          position: absolute;
          left: 1rem;
          color: #9ca3af;
        }

        .form-input {
          width: 100%;
          padding: 0.875rem 1rem 0.875rem 3rem;
          border: 2px solid #e5e7eb;
          background: white;
          border-radius: 12px;
          font-size: 1rem;
          color: #1a1a2e;
          outline: none;
          transition: border-color 0.3s ease;
        }

        .form-input:focus {
          border-color: #3b82f6;
        }

        .form-input::placeholder {
          color: #9ca3af;
        }

        .password-toggle {
          position: absolute;
          right: 1rem;
          background: none;
          border: none;
          cursor: pointer;
          color: #9ca3af;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .password-toggle:hover {
          color: #6b7280;
        }

        .checkbox-wrapper {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
          margin-bottom: 2rem;
        }

        .checkbox-input {
          width: 18px;
          height: 18px;
          cursor: pointer;
          accent-color: #3b82f6;
          margin-top: 2px;
        }

        .checkbox-label {
          font-size: 0.875rem;
          color: #6b7280;
          cursor: pointer;
          line-height: 1.5;
        }

        .terms-link {
          color: #3b82f6;
          text-decoration: none;
          font-weight: 500;
        }

        .terms-link:hover {
          text-decoration: underline;
        }

        .register-button {
          width: 100%;
          padding: 1rem;
          background: #3b82f6;
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.3s ease;
          margin-bottom: 1.5rem;
        }

        .register-button:hover {
          background: #2563eb;
        }

        .divider {
          display: flex;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .divider-line {
          flex: 1;
          height: 1px;
          background: #e5e7eb;
        }

        .divider-text {
          padding: 0 1rem;
          color: #9ca3af;
          font-size: 0.875rem;
        }

        .social-buttons {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .social-button {
          padding: 0.875rem;
          border: 2px solid #e5e7eb;
          background: white;
          border-radius: 12px;
          font-size: 0.875rem;
          font-weight: 500;
          color: #6b7280;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .social-button:hover {
          border-color: #3b82f6;
          color: #3b82f6;
        }

        .signin-text {
          text-align: center;
          color: #6b7280;
          font-size: 0.875rem;
        }

        .signin-link {
          color: #3b82f6;
          text-decoration: none;
          font-weight: 600;
        }

        .signin-link:hover {
          text-decoration: underline;
        }

        .register-right {
          background: linear-gradient(135deg, #e8eef7 0%, #dce4f2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 3rem;
          position: relative;
          overflow: hidden;
        }

        .register-image-wrapper {
          max-width: 500px;
          width: 100%;
        }

        .register-image {
          width: 100%;
          height: auto;
          border-radius: 20px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
        }

        @media (max-width: 968px) {
          .register-page {
            grid-template-columns: 1fr;
          }

          .register-right {
            display: none;
          }

          .register-left {
            padding: 2rem 1.5rem;
          }

          .register-title {
            font-size: 2rem;
          }
        }
      `}</style>

      <div className="register-page">
        <div className="register-left">
          <div className="register-form-container">
            <div className="logo-section">
              <div className="logo-circle">
                <div className="logo-circle-inner"></div>
              </div>
              <span className="logo-text">logoipsum</span>
            </div>

            <h1 className="register-title">Create account</h1>
            <p className="register-subtitle">
              Join us today and find your perfect property
            </p>

            <div>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <div className="input-wrapper">
                  <User size={20} className="input-icon" />
                  <input 
                    type="text" 
                    name="fullName"
                    placeholder="Enter your full name" 
                    className="form-input"
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Email</label>
                <div className="input-wrapper">
                  <Mail size={20} className="input-icon" />
                  <input 
                    type="email" 
                    name="email"
                    placeholder="Enter your email" 
                    className="form-input"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <div className="input-wrapper">
                  <Phone size={20} className="input-icon" />
                  <input 
                    type="tel" 
                    name="phone"
                    placeholder="Enter your phone number" 
                    className="form-input"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Password</label>
                <div className="input-wrapper">
                  <Lock size={20} className="input-icon" />
                  <input 
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Create a password" 
                    className="form-input"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <button 
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Confirm Password</label>
                <div className="input-wrapper">
                  <Lock size={20} className="input-icon" />
                  <input 
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm your password" 
                    className="form-input"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  <button 
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="checkbox-wrapper">
                <input 
                  type="checkbox" 
                  id="terms" 
                  className="checkbox-input"
                />
                <label htmlFor="terms" className="checkbox-label">
                  I agree to the <a href="#" className="terms-link">Terms of Service</a> and <a href="#" className="terms-link">Privacy Policy</a>
                </label>
              </div>

              <button onClick={handleSubmit} className="register-button">
                Create Account
              </button>
            </div>

            <div className="divider">
              <div className="divider-line"></div>
              <span className="divider-text">Or sign up with</span>
              <div className="divider-line"></div>
            </div>

            <div className="social-buttons">
              <button className="social-button">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Google
              </button>
              <button className="social-button">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#1877F2">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </button>
            </div>

            <p className="signin-text">
              Already have an account? <a href="#" className="signin-link">Sign in</a>
            </p>
          </div>
        </div>

        <div className="register-right">
          <div className="register-image-wrapper">
            <img 
              src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&q=80" 
              alt="Beautiful property" 
              className="register-image"
            />
          </div>
        </div>
      </div>
    </>
  );
}