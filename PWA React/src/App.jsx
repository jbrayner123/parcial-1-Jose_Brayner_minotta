import React, { useState, useEffect } from 'react';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';

export default function App() {
  // Recuperar sesión activa de localStorage ('auth_user') al iniciar o recargar
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem('auth_user');
      if (storedUser) {
        return JSON.parse(storedUser);
      }
    } catch (err) {
      console.error('Error al parsear el usuario en sesión:', err);
    }
    return null;
  });

  // Estado para capturar el evento de instalación PWA
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallBanner(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setShowInstallBanner(false);
    }
    setDeferredPrompt(null);
  };

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem('auth_user');
    } catch (err) {
      console.error('Error al remover la sesión:', err);
    }
    setCurrentUser(null);
  };

  return (
    <>
      {showInstallBanner && (
        <div className="pwa-banner">
          <span>Esta aplicación puede ser instalada en su dispositivo para uso sin conexión.</span>
          <div className="pwa-banner-actions">
            <button
              type="button"
              className="btn btn-primary"
              style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem' }}
              onClick={handleInstallClick}
            >
              Instalar PWA
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem' }}
              onClick={() => setShowInstallBanner(false)}
            >
              Descartar
            </button>
          </div>
        </div>
      )}

      {currentUser ? (
        <DashboardPage user={currentUser} onLogout={handleLogout} />
      ) : (
        <LoginPage onLoginSuccess={handleLoginSuccess} />
      )}
    </>
  );
}
