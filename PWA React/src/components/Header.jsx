import React from 'react';

export default function Header({ user, onLogout }) {
  const getInitials = (name) => {
    if (!name) return 'U';
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <header className="app-header">
      <div className="header-content">
        <div className="brand-section">
          <div className="brand-symbol" aria-hidden="true">+</div>
          <div>
            <div className="brand-header-row">
              <h1 className="brand-title">Administración de Pacientes</h1>
              <span className="pwa-status-tag">PWA Local</span>
            </div>
            <p className="brand-subtitle">Módulo Clínico Hospitalario</p>
          </div>
        </div>

        <div className="user-session-bar">
          <div className="user-avatar-badge" aria-hidden="true">
            {getInitials(user?.name || user?.email)}
          </div>
          <div className="user-info">
            <div className="user-name">{user?.name || user?.email}</div>
            <div className="user-role">{user?.role || 'Personal Autorizado'}</div>
          </div>
          <button
            type="button"
            className="btn btn-secondary btn-header-logout"
            onClick={onLogout}
            title="Finalizar la sesión activa"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </header>
  );
}
