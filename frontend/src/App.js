import React, { useState, useEffect } from 'react';
import './styles/App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AdminPanel from './pages/AdminPanel';
import PublicCatalog from './pages/PublicCatalog';
import Login from './pages/Login';
import SplashScreen from './components/public/SplashScreen';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initApp = async () => {
      // Start both authentication check and a minimum delay for the splash screen
      const authPromise = checkAuth();
      const delayPromise = new Promise(resolve => setTimeout(resolve, 2000));
      
      await Promise.all([authPromise, delayPromise]);
      setLoading(false);
    };
    
    initApp();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('admin_token');
    setIsAuthenticated(!!token);
  };

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route
          path="/admin/*"
          element={isAuthenticated ? <AdminPanel setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/admin/login" />}
        />
        <Route path="/" element={<PublicCatalog />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
