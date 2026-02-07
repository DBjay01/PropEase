export const fetchWithAuth = async (url, options = {}) => {
  const token = localStorage.getItem('token');
  const headers = {
    ...options.headers,
  };

  // Only add Authorization header if token exists
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(url, { ...options, headers });

  // Only redirect on 401 if user was trying to access a protected resource with a token
  if (response.status === 401 && token) {
    // Token is invalid or expired, handle logout
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/'; // Redirect to login page
    throw new Error('Unauthorized. Please log in again.');
  }

  return response;
};