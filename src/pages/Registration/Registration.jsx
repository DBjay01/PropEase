import React, { useState } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";

function Registration() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "buyer",
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(formData);
  }

  function Register() {
    navigate("/"); // correct navigation
  }

  return (
    <div className="register-container d-flex justify-content-center align-items-center">
      <div className="register-card shadow-lg">

        {/* LOGO SECTION */}
        <div className="text-center mb-3">
          <h3 className="reg-title mt-2">Create Your Account</h3>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit}>

          {/* Full Name */}
          <div className="mb-3">
            <label className="form-label reg-label">Full Name</label>
            <input
              type="text"
              name="fullname"
              className="form-control reg-input"
              placeholder="Enter full name"
              value={formData.fullname}
              onChange={handleChange}
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label reg-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control reg-input"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label reg-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control reg-input"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-3">
            <label className="form-label reg-label">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              className="form-control reg-input"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          {/* Role */}
          <div className="mb-3">
            <label className="form-label reg-label">Register As</label>
            <select
              className="form-select reg-input"
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* BUTTON */}
          <button
            className="btn btn-primary w-100 reg-btn mt-2"
            onClick={Register}
            type="button"
          >
            Register
          </button>
        </form>

        {/* LOGIN LINK */}
        <p className="text-center mt-3 reg-login-text">
          Already have an account?{" "}
          <a href="#" className="reg-login-link">Login</a>
        </p>

      </div>
    </div>
  );
}

export default Registration;
