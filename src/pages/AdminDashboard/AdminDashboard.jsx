import React, { useState } from 'react';
import { 
  BarChart3, Users, Home, TrendingUp, AlertCircle, 
  ArrowUp, ArrowDown, Eye, Edit2, Trash2, Search,
  Filter, Download, Plus, MoreVertical
} from 'lucide-react';

export default function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const stats = [
    {
      title: 'Total Properties',
      value: '1,234',
      change: '+12.5%',
      isPositive: true,
      icon: Home,
      color: '#17a2b8'
    },
    {
      title: 'Active Users',
      value: '856',
      change: '+8.2%',
      isPositive: true,
      icon: Users,
      color: '#007bff'
    },
    {
      title: 'Total Revenue',
      value: '$48.5K',
      change: '+23.1%',
      isPositive: true,
      icon: TrendingUp,
      color: '#28a745'
    },
    {
      title: 'Pending Approvals',
      value: '23',
      change: '-5.4%',
      isPositive: false,
      icon: AlertCircle,
      color: '#ffc107'
    }
  ];

  const recentProperties = [
    {
      id: 1,
      title: 'Luxury Apartment in Downtown',
      seller: 'John Doe',
      price: '$450,000',
      status: 'Active',
      date: '2024-01-15'
    },
    {
      id: 2,
      title: 'Modern Villa with Garden',
      seller: 'Jane Smith',
      price: '$750,000',
      status: 'Pending',
      date: '2024-01-14'
    },
    {
      id: 3,
      title: 'Commercial Space',
      seller: 'Mike Johnson',
      price: '$320,000',
      status: 'Active',
      date: '2024-01-13'
    },
    {
      id: 4,
      title: 'Residential Complex',
      seller: 'Sarah Wilson',
      price: '$1,200,000',
      status: 'Rejected',
      date: '2024-01-12'
    },
    {
      id: 5,
      title: 'Beachfront Property',
      seller: 'Robert Brown',
      price: '$890,000',
      status: 'Active',
      date: '2024-01-11'
    }
  ];

  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Seller', joined: '2023-06-15', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Buyer', joined: '2023-07-20', status: 'Active' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'Seller', joined: '2023-08-10', status: 'Inactive' },
    { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', role: 'Buyer', joined: '2023-09-05', status: 'Active' }
  ];

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

        .admin-dashboard {
          padding: 2rem 0;
          min-height: 100vh;
          background-color: #f8f9fa;
        }

        .dashboard-header {
          margin-bottom: 3rem;
        }

        .dashboard-title {
          font-size: 2rem;
          font-weight: 700;
          color: #212529;
          margin-bottom: 0.5rem;
        }

        .dashboard-subtitle {
          color: #6c757d;
          font-size: 1rem;
        }

        /* Stats Cards */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-bottom: 3rem;
        }

        .stat-card {
          background: white;
          border-radius: 1rem;
          padding: 1.5rem;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
          transition: transform 0.3s, box-shadow 0.3s;
        }

        .stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 16px rgba(0,0,0,0.12);
        }

        .stat-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1rem;
        }

        .stat-icon {
          width: 50px;
          height: 50px;
          border-radius: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .stat-title {
          color: #6c757d;
          font-size: 0.875rem;
          font-weight: 500;
        }

        .stat-value {
          font-size: 1.75rem;
          font-weight: 700;
          color: #212529;
          margin: 0.5rem 0;
        }

        .stat-change {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          font-weight: 600;
        }

        .stat-change.positive {
          color: #28a745;
        }

        .stat-change.negative {
          color: #dc3545;
        }

        /* Content Cards */
        .content-card {
          background: white;
          border-radius: 1rem;
          padding: 1.5rem;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
          margin-bottom: 2rem;
        }

        .card-header-custom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #e9ecef;
        }

        .card-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: #212529;
        }

        .card-actions {
          display: flex;
          gap: 1rem;
        }

        .btn-custom {
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          border: none;
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }

        .btn-primary-custom {
          background: #007bff;
          color: white;
        }

        .btn-primary-custom:hover {
          background: #0056b3;
        }

        .btn-secondary-custom {
          background: #e9ecef;
          color: #495057;
        }

        .btn-secondary-custom:hover {
          background: #dee2e6;
        }

        .search-filter-bar {
          display: flex;
          gap: 1rem;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
        }

        .search-input {
          flex: 1;
          min-width: 200px;
          padding: 0.625rem 1rem;
          border: 1px solid #ced4da;
          border-radius: 0.5rem;
          font-size: 0.875rem;
        }

        .search-input:focus {
          outline: none;
          border-color: #007bff;
          box-shadow: 0 0 0 0.2rem rgba(0,123,255,0.25);
        }

        .filter-select {
          padding: 0.625rem 1rem;
          border: 1px solid #ced4da;
          border-radius: 0.5rem;
          font-size: 0.875rem;
          background: white;
          cursor: pointer;
        }

        .filter-select:focus {
          outline: none;
          border-color: #007bff;
          box-shadow: 0 0 0 0.2rem rgba(0,123,255,0.25);
        }

        /* Table Styles */
        .table-responsive {
          overflow-x: auto;
        }

        .table-custom {
          width: 100%;
          border-collapse: collapse;
        }

        .table-custom thead {
          background-color: #f8f9fa;
          border-bottom: 2px solid #e9ecef;
        }

        .table-custom th {
          padding: 1rem;
          text-align: left;
          font-size: 0.875rem;
          font-weight: 600;
          color: #6c757d;
          text-transform: uppercase;
        }

        .table-custom td {
          padding: 1rem;
          border-bottom: 1px solid #e9ecef;
          font-size: 0.875rem;
          color: #495057;
        }

        .table-custom tbody tr:hover {
          background-color: #f8f9fa;
        }

        .badge-custom {
          display: inline-block;
          padding: 0.375rem 0.75rem;
          border-radius: 50px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
        }

        .badge-active {
          background-color: #d4edda;
          color: #155724;
        }

        .badge-pending {
          background-color: #fff3cd;
          color: #856404;
        }

        .badge-rejected {
          background-color: #f8d7da;
          color: #721c24;
        }

        .badge-inactive {
          background-color: #e2e3e5;
          color: #383d41;
        }

        .action-buttons {
          display: flex;
          gap: 0.5rem;
        }

        .btn-action {
          width: 32px;
          height: 32px;
          border: none;
          border-radius: 0.375rem;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s;
        }

        .btn-view {
          background: #e3f2fd;
          color: #1976d2;
        }

        .btn-view:hover {
          background: #bbdefb;
        }

        .btn-edit {
          background: #fff3e0;
          color: #f57c00;
        }

        .btn-edit:hover {
          background: #ffe0b2;
        }

        .btn-delete {
          background: #ffebee;
          color: #c62828;
        }

        .btn-delete:hover {
          background: #ffcdd2;
        }

        .two-column-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          margin-top: 2rem;
        }

        @media (max-width: 1200px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .two-column-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .stats-grid {
            grid-template-columns: 1fr;
          }

          .search-filter-bar {
            flex-direction: column;
          }

          .search-input,
          .filter-select {
            width: 100%;
          }

          .table-custom {
            font-size: 0.75rem;
          }

          .table-custom th,
          .table-custom td {
            padding: 0.75rem 0.5rem;
          }

          .dashboard-title {
            font-size: 1.5rem;
          }

          .card-header-custom {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }

          .card-actions {
            width: 100%;
            justify-content: flex-start;
          }
        }
      `}</style>

      <div className="admin-dashboard">
        <div className="container-fluid">
          {/* Dashboard Header */}
          <div className="dashboard-header">
            <h1 className="dashboard-title">Admin Dashboard</h1>
            <p className="dashboard-subtitle">Welcome back, Administrator. Here's your system overview.</p>
          </div>

          {/* Stats Cards */}
          <div className="stats-grid">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="stat-card">
                  <div className="stat-header">
                    <div>
                      <p className="stat-title">{stat.title}</p>
                      <p className="stat-value">{stat.value}</p>
                    </div>
                    <div className="stat-icon" style={{ backgroundColor: stat.color }}>
                      <Icon size={24} />
                    </div>
                  </div>
                  <div className={`stat-change ${stat.isPositive ? 'positive' : 'negative'}`}>
                    {stat.isPositive ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
                    <span>{stat.change}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Recent Properties */}
          <div className="content-card">
            <div className="card-header-custom">
              <h2 className="card-title">Recent Properties</h2>
              <div className="card-actions">
                <button className="btn-custom btn-secondary-custom">
                  <Download size={16} />
                  Export
                </button>
                <button className="btn-custom btn-primary-custom">
                  <Plus size={16} />
                  Add Property
                </button>
              </div>
            </div>

            <div className="search-filter-bar">
              <div style={{ flex: 1, display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <Search size={16} color="#6c757d" />
                <input
                  type="text"
                  className="search-input"
                  placeholder="Search properties..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ flex: 1 }}
                />
              </div>
              <select 
                className="filter-select"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            <div className="table-responsive">
              <table className="table-custom">
                <thead>
                  <tr>
                    <th>Property Title</th>
                    <th>Seller</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentProperties.map((property) => (
                    <tr key={property.id}>
                      <td>{property.title}</td>
                      <td>{property.seller}</td>
                      <td>{property.price}</td>
                      <td>
                        <span className={`badge-custom badge-${property.status.toLowerCase()}`}>
                          {property.status}
                        </span>
                      </td>
                      <td>{property.date}</td>
                      <td>
                        <div className="action-buttons">
                          <button className="btn-action btn-view" title="View">
                            <Eye size={16} />
                          </button>
                          <button className="btn-action btn-edit" title="Edit">
                            <Edit2 size={16} />
                          </button>
                          <button className="btn-action btn-delete" title="Delete">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Users and More Info Grid */}
          <div className="two-column-grid">
            {/* Active Users */}
            <div className="content-card">
              <div className="card-header-custom">
                <h2 className="card-title">Active Users</h2>
                <button className="btn-custom btn-secondary-custom">
                  <MoreVertical size={16} />
                </button>
              </div>

              <div className="table-responsive">
                <table className="table-custom">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Role</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td>
                          <div>
                            <strong>{user.name}</strong>
                            <div style={{ fontSize: '0.75rem', color: '#6c757d' }}>{user.email}</div>
                          </div>
                        </td>
                        <td>{user.role}</td>
                        <td>
                          <span className={`badge-custom badge-${user.status.toLowerCase()}`}>
                            {user.status}
                          </span>
                        </td>
                        <td>
                          <div className="action-buttons">
                            <button className="btn-action btn-view" title="View">
                              <Eye size={16} />
                            </button>
                            <button className="btn-action btn-edit" title="Edit">
                              <Edit2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="content-card">
              <h2 className="card-title">System Overview</h2>
              
              <div style={{ marginTop: '1.5rem' }}>
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.875rem', fontWeight: '500', color: '#6c757d' }}>Properties Listed</span>
                    <span style={{ fontSize: '0.875rem', fontWeight: '600', color: '#212529' }}>1,234</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', backgroundColor: '#e9ecef', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: '85%', height: '100%', backgroundColor: '#007bff' }}></div>
                  </div>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.875rem', fontWeight: '500', color: '#6c757d' }}>Active Users</span>
                    <span style={{ fontSize: '0.875rem', fontWeight: '600', color: '#212529' }}>856</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', backgroundColor: '#e9ecef', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: '72%', height: '100%', backgroundColor: '#17a2b8' }}></div>
                  </div>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.875rem', fontWeight: '500', color: '#6c757d' }}>Pending Approvals</span>
                    <span style={{ fontSize: '0.875rem', fontWeight: '600', color: '#212529' }}>23</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', backgroundColor: '#e9ecef', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: '15%', height: '100%', backgroundColor: '#ffc107' }}></div>
                  </div>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.875rem', fontWeight: '500', color: '#6c757d' }}>System Health</span>
                    <span style={{ fontSize: '0.875rem', fontWeight: '600', color: '#212529' }}>98%</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', backgroundColor: '#e9ecef', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: '98%', height: '100%', backgroundColor: '#28a745' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}