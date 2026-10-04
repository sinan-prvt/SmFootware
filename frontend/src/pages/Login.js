import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

function Login({ setIsAuthenticated }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const baseUrl = (process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api').replace(/\/$/, '');
      const response = await fetch(`${baseUrl}/token-auth/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('admin_token', data.token);
        setIsAuthenticated(true);
        navigate('/admin');
      } else {
        const errorData = await response.json();
        setError(errorData.error || errorData.details || 'Invalid username or password');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <aside className="login-showcase" aria-hidden="true">
        <div className="showcase-orb" />
        <div className="showcase-ring" />
        <div className="showcase-ring ring-2"><i /></div>
        <div className="showcase-copy">
          <span className="showcase-tag">Vendor portal</span>
          <h2>Run the<br /><em>collection.</em></h2>
          <p>Add drops, update stock and keep the Footonia catalog fresh.</p>
        </div>
        <div className="showcase-giant">FOOTONIA</div>
      </aside>

      <div className="login-panel">
        <a href="/" className="login-back">← Back to store</a>
        <div className="login-card">
          <div className="login-header">
            <img src="/logo.svg" alt="Footonia" className="login-logo" />
            <h1>Welcome back</h1>
            <p className="login-sub">Sign in to manage your inventory.</p>
            <div className="admin-warning">
              <span className="warning-dot" /> Private admin portal · access restricted
            </div>
          </div>

          <form onSubmit={handleLogin} className="login-form">
            <div className="input-group">
              <label htmlFor="login-username">Username / Email</label>
              <input
                id="login-username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="login-password">Password</label>
              <input
                id="login-password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
            </div>

            {error && <div className="login-error">{error}</div>}

            <button type="submit" className="login-submit-btn" disabled={loading}>
              {loading ? (
                <><span className="btn-spinner" /> Authenticating...</>
              ) : (
                <>Sign In <span className="submit-arrow" aria-hidden="true">→</span></>
              )}
            </button>
          </form>

          <div className="login-footer">
            <p>Locked system · authorized access only</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
