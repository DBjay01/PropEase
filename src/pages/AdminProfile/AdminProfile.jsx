import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Building, Calendar, Edit2, Save, X, Camera } from 'lucide-react';

export default function AdminProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Kedar Bile',
    email: 'kbile@gmail.com',
    phone: '+91 98500 07092',
    role: 'Administrator',
    department: 'Operations',
    location: 'Pune',
    joinDate: 'January 15, 2023',
    bio: 'Experienced real estate administrator with over 10 years in property management and sales operations.'
  });

  const [tempProfile, setTempProfile] = useState(profile);

  const handleEdit = () => {
    setTempProfile(profile);
    setIsEditing(true);
  };

  const handleSave = () => {
    setProfile(tempProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempProfile(profile);
    setIsEditing(false);
  };

  const handleChange = (field, value) => {
    setTempProfile({ ...tempProfile, [field]: value });
  };

  return (
    <>
      <link 
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" 
        rel="stylesheet"
      />
      
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
          background-color: #f8f9fa;
        }

        .profile-card {
          background: white;
          border-radius: 1rem;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        }

        .cover-section {
          height: 200px;
          background: linear-gradient(135deg, #17a2b8 0%, #007bff 100%);
        }

        .profile-header {
          position: relative;
          padding: 0 2rem 2rem;
        }

        .profile-picture-wrapper {
          position: relative;
          margin-top: -80px;
          width: 160px;
        }

        .profile-picture {
          width: 160px;
          height: 160px;
          border-radius: 50%;
          border: 4px solid white;
          background: linear-gradient(135deg, #17a2b8 0%, #007bff 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .camera-btn {
          position: absolute;
          bottom: 8px;
          right: 8px;
          width: 40px;
          height: 40px;
          background: white;
          border: none;
          border-radius: 50%;
          box-shadow: 0 2px 8px rgba(0,0,0,0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.3s;
        }

        .camera-btn:hover {
          background: #f8f9fa;
        }

        .profile-info {
          padding-top: 1rem;
        }

        .profile-name {
          font-size: 2rem;
          font-weight: 700;
          color: #212529;
          margin-bottom: 0.5rem;
        }

        .profile-role {
          color: #6c757d;
          font-size: 1rem;
        }

        .btn-edit {
          background: #007bff;
          color: white;
          border: none;
          padding: 0.625rem 1.5rem;
          border-radius: 50px;
          font-weight: 500;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          transition: background 0.3s;
        }

        .btn-edit:hover {
          background: #0056b3;
        }

        .btn-cancel {
          background: #e9ecef;
          color: #495057;
          border: none;
          padding: 0.625rem 1.5rem;
          border-radius: 50px;
          font-weight: 500;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          transition: background 0.3s;
        }

        .btn-cancel:hover {
          background: #dee2e6;
        }

        .profile-content {
          padding: 0 2rem 2rem;
        }

        .section-title {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
          color: #212529;
        }

        .info-item {
          display: flex;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .info-icon {
          color: #adb5bd;
          margin-top: 4px;
          flex-shrink: 0;
        }

        .info-content {
          flex: 1;
        }

        .info-label {
          display: block;
          font-size: 0.875rem;
          font-weight: 500;
          color: #6c757d;
          margin-bottom: 0.25rem;
        }

        .info-value {
          color: #212529;
          font-size: 1rem;
        }

        .form-control {
          border-radius: 0.5rem;
          border: 1px solid #ced4da;
          padding: 0.625rem 1rem;
        }

        .form-control:focus {
          border-color: #007bff;
          box-shadow: 0 0 0 0.2rem rgba(0,123,255,0.25);
        }

        .stats-card {
          background: #f8f9fa;
          border-radius: 0.75rem;
          padding: 1.5rem;
        }

        .stats-title {
          font-weight: 600;
          margin-bottom: 1rem;
          color: #212529;
        }

        .stat-item {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.75rem;
          font-size: 0.875rem;
        }

        .stat-label {
          color: #6c757d;
        }

        .stat-value {
          font-weight: 600;
          color: #212529;
        }

        @media (max-width: 768px) {
          .profile-header {
            padding: 0 1rem 1rem;
          }

          .profile-content {
            padding: 0 1rem 1rem;
          }

          .profile-name {
            font-size: 1.5rem;
          }
        }
      `}</style>

      <div>
        {/* Main Content */}
        <main className="container my-5">
          <div className="profile-card">
            {/* Cover Section */}
            <div className="cover-section"></div>

            {/* Profile Header */}
            <div className="profile-header">
              <div className="row">
                <div className="col-lg-8">
                  <div className="d-flex flex-column flex-sm-row align-items-start gap-4">
                    <div className="profile-picture-wrapper">
                      <div className="profile-picture">
                        <User size={80} />
                      </div>
                      <button className="camera-btn">
                        <Camera size={20} color="#6c757d" />
                      </button>
                    </div>
                    <div className="profile-info flex-grow-1">
                      <h1 className="profile-name">{profile.name}</h1>
                      <p className="profile-role">{profile.role} • {profile.department}</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 d-flex align-items-end justify-content-lg-end mt-3 mt-lg-0">
                  {!isEditing ? (
                    <button onClick={handleEdit} className="btn-edit">
                      <Edit2 size={16} />
                      <span>Edit Profile</span>
                    </button>
                  ) : (
                    <div className="d-flex gap-2">
                      <button onClick={handleSave} className="btn-edit">
                        <Save size={16} />
                        <span>Save</span>
                      </button>
                      <button onClick={handleCancel} className="btn-cancel">
                        <X size={16} />
                        <span>Cancel</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Profile Content */}
            <div className="profile-content">
              <div className="row">
                {/* Left Column */}
                <div className="col-lg-8">
                  <div className="mb-5">
                    <h2 className="section-title">Contact Information</h2>
                    
                    <div className="info-item">
                      <Mail className="info-icon" size={20} />
                      <div className="info-content">
                        <label className="info-label">Email</label>
                        {isEditing ? (
                          <input
                            type="email"
                            className="form-control"
                            value={tempProfile.email}
                            onChange={(e) => handleChange('email', e.target.value)}
                          />
                        ) : (
                          <p className="info-value">{profile.email}</p>
                        )}
                      </div>
                    </div>

                    <div className="info-item">
                      <Phone className="info-icon" size={20} />
                      <div className="info-content">
                        <label className="info-label">Phone</label>
                        {isEditing ? (
                          <input
                            type="tel"
                            className="form-control"
                            value={tempProfile.phone}
                            onChange={(e) => handleChange('phone', e.target.value)}
                          />
                        ) : (
                          <p className="info-value">{profile.phone}</p>
                        )}
                      </div>
                    </div>

                    <div className="info-item">
                      <MapPin className="info-icon" size={20} />
                      <div className="info-content">
                        <label className="info-label">Location</label>
                        {isEditing ? (
                          <input
                            type="text"
                            className="form-control"
                            value={tempProfile.location}
                            onChange={(e) => handleChange('location', e.target.value)}
                          />
                        ) : (
                          <p className="info-value">{profile.location}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h2 className="section-title">About</h2>
                    {isEditing ? (
                      <textarea
                        className="form-control"
                        rows="4"
                        value={tempProfile.bio}
                        onChange={(e) => handleChange('bio', e.target.value)}
                      />
                    ) : (
                      <p className="info-value">{profile.bio}</p>
                    )}
                  </div>
                </div>

                {/* Right Column */}
                <div className="col-lg-4 mt-5 mt-lg-0">
                  <div className="mb-4">
                    <h2 className="section-title">Details</h2>
                    
                    <div className="info-item">
                      <Building className="info-icon" size={20} />
                      <div className="info-content">
                        <label className="info-label">Department</label>
                        <p className="info-value">{profile.department}</p>
                      </div>
                    </div>

                    <div className="info-item">
                      <User className="info-icon" size={20} />
                      <div className="info-content">
                        <label className="info-label">Role</label>
                        <p className="info-value">{profile.role}</p>
                      </div>
                    </div>

                    <div className="info-item">
                      <Calendar className="info-icon" size={20} />
                      <div className="info-content">
                        <label className="info-label">Join Date</label>
                        <p className="info-value">{profile.joinDate}</p>
                      </div>
                    </div>
                  </div>

                  <div className="stats-card">
                    <h3 className="stats-title">Account Statistics</h3>
                    <div className="stat-item">
                      <span className="stat-label">Properties Listed</span>
                      <span className="stat-value">142</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">Active Agents</span>
                      <span className="stat-value">28</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">Total Sales</span>
                      <span className="stat-value">$12.4M</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}