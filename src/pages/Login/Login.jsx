import React, { useState } from "react";
import "./Login.css";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "buyer",
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(formData);
  }

  return (
    <div className="login-container d-flex justify-content-center align-items-center">
      <div className="login-card row shadow-lg rounded overflow-hidden">

        {/* LEFT IMAGE SIDE */}
        <div className="col-md-6 p-0">
          <img
            src="/loginImg.jpg"    // correct relative path for React Vite/CRA
            className="login-image"
            alt="login"
          />
        </div>

        {/* RIGHT FORM SIDE */}
        <div className="col-md-6 form-section p-4 glass-effect">
          <h3 className="text-center mb-4 login-title">Welcome Back</h3>

          <form onSubmit={handleSubmit}>
            {/* EMAIL */}
            <div className="mb-3">
              <label className="form-label input-label">Email</label>
              <input
                type="email"
                name="email"
                className="form-control custom-input"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* PASSWORD */}
            <div className="mb-3">
              <label className="form-label input-label">Password</label>
              <input
                type="password"
                name="password"
                className="form-control custom-input"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <div className="text-end">
                <a href="#" className="small forgot-link">Forgot Password?</a>
              </div>
            </div>

            {/* DROPDOWN */}
            <div className="mb-3">
              <label className="form-label input-label">Login As</label>
              <select
                className="form-select custom-input"
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="admin">Admin</option>
                <option value="buyer">Buyer</option>
                <option value="seller">Seller</option>
              </select>
            </div>

            {/* REMEMBER ME */}
            <div className="form-check mb-3">
              <input type="checkbox" className="form-check-input" id="remember" />
              <label className="form-check-label remember-label" htmlFor="remember">
                Remember me
              </label>
            </div>

            {/* BUTTON */}
            <button className="btn btn-primary w-100 rounded-pill login-btn">
              Log In
            </button>
          </form>

          {/* REGISTER */}
          <p className="text-center mt-3 signup-text">
            Don't have an account?{" "}
            <a href="/register" className="signup-link">Create one</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
