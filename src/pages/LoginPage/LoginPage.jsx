import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

    const navigate = useNavigate()


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt:', { email, password });
    navigate('home')
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

        .login-page {
          min-height: 100vh;
          display: grid;
          grid-template-columns: 1fr 1fr;
          background: white;
        }

        .login-left {
          background: linear-gradient(135deg, #e8eef7 0%, #dce4f2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 3rem;
          position: relative;
          overflow: hidden;
        }

        .login-image-wrapper {
          max-width: 500px;
          width: 100%;
        }

        .login-image {
          width: 100%;
          height: auto;
          border-radius: 20px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
        }

        .login-right {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 3rem;
        }

        .login-form-container {
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

        .login-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: #1a1a2e;
          margin-bottom: 0.5rem;
        }

        .login-subtitle {
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

        .form-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .checkbox-wrapper {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .checkbox-input {
          width: 18px;
          height: 18px;
          cursor: pointer;
          accent-color: #3b82f6;
        }

        .checkbox-label {
          font-size: 0.875rem;
          color: #6b7280;
          cursor: pointer;
        }

        .forgot-link {
          font-size: 0.875rem;
          color: #3b82f6;
          text-decoration: none;
          font-weight: 500;
        }

        .forgot-link:hover {
          text-decoration: underline;
        }

        .login-button {
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

        .login-button:hover {
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

        .signup-text {
          text-align: center;
          color: #6b7280;
          font-size: 0.875rem;
        }

        .signup-link {
          color: #3b82f6;
          text-decoration: none;
          font-weight: 600;
        }

        .signup-link:hover {
          text-decoration: underline;
        }

        @media (max-width: 968px) {
          .login-page {
            grid-template-columns: 1fr;
          }

          .login-left {
            display: none;
          }

          .login-right {
            padding: 2rem 1.5rem;
          }

          .login-title {
            font-size: 2rem;
          }
        }
      `}</style>

      <div className="login-page">
        
        <div className="login-left">
          <div className="login-image-wrapper">
            <img 
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80" 
              alt="Modern house" 
              className="login-image"
            />
          </div>
        </div>

        <div className="login-right">
          <div className="login-form-container">
            <div className="logo-section">
              <div className="logo-circle">
                <div className="logo-circle-inner"></div>
              </div>
              <span className="logo-text">PropEase</span>
            </div>

            <h1 className="login-title">Welcome back</h1>
            <p className="login-subtitle">
              Please enter your details to sign in
            </p>

            <div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <div className="input-wrapper">
                  <Mail size={20} className="input-icon" />
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="form-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Password</label>
                <div className="input-wrapper">
                  <Lock size={20} className="input-icon" />
                  <input 
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password" 
                    className="form-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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

              <div className="form-footer">
                <div className="checkbox-wrapper">
                  <input 
                    type="checkbox" 
                    id="remember" 
                    className="checkbox-input"
                  />
                  <label htmlFor="remember" className="checkbox-label">
                    Remember me
                  </label>
                </div>
                <a href="#" className="forgot-link">Forgot password?</a>
              </div>

              <button onClick={handleSubmit} className="login-button">
                Sign In 
              </button>

            </div>

            <div className="divider">
              <div className="divider-line"></div>
              <span className="divider-text">Or continue with</span>
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

            <p className="signup-text">
              Don't have an account? <a href="register" className="signup-link">Sign up</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}