import React, { useState } from 'react';
import { VALID_USERS } from '../data/defaultUsers';

export default function LoginPage({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    if (!cleanEmail || !cleanPassword) {
      setErrorMessage('Por favor ingrese tanto el correo electrónico como la contraseña.');
      return;
    }

    const matchedUser = VALID_USERS.find(
      (user) => user.email.toLowerCase() === cleanEmail && user.password === cleanPassword
    );

    if (matchedUser) {
      const sessionUser = {
        id: matchedUser.id,
        email: matchedUser.email,
        name: matchedUser.name,
        role: matchedUser.role,
        loginAt: new Date().toISOString()
      };

      try {
        localStorage.setItem('auth_user', JSON.stringify(sessionUser));
      } catch (err) {
        console.error('Error al guardar la sesión en localStorage:', err);
      }

      onLoginSuccess(sessionUser);
    } else {
      setErrorMessage('Credenciales inválidas. Verifique su correo electrónico y contraseña.');
    }
  };

  const handleFillDemo = (demoEmail, demoPassword) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    setErrorMessage('');
  };

  return (
    <div className="login-screen">
      <div className="login-card">
        <div className="login-header">
          <div className="login-logo" aria-hidden="true">+</div>
          <h1 className="login-title">Acceso al Sistema Clínico</h1>
          <p className="login-subtitle">Módulo de Administración de Pacientes</p>
        </div>

        {errorMessage && (
          <div className="alert alert-error" role="alert">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="login-email" className="form-label">
              Correo Electrónico
            </label>
            <input
              id="login-email"
              type="email"
              className="form-input"
              placeholder="usuario@hospital.local"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errorMessage) setErrorMessage('');
              }}
              autoComplete="username"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="login-password" className="form-label">
              Contraseña
            </label>
            <input
              id="login-password"
              type="password"
              className="form-input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errorMessage) setErrorMessage('');
              }}
              autoComplete="current-password"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary btn-block" style={{ marginTop: '0.5rem' }}>
            Iniciar Sesión
          </button>
        </form>

        <div className="demo-credentials-box">
          <div className="demo-credentials-title">Usuarios de Prueba Autorizados</div>
          <ul className="demo-credentials-list">
            {VALID_USERS.map((user) => (
              <li key={user.id} className="demo-credentials-item">
                <div>
                  <span className="demo-code">{user.email}</span>
                  <div style={{ color: 'var(--color-text-muted)' }}>{user.name} ({user.role})</div>
                </div>
                <button
                  type="button"
                  className="btn btn-secondary"
                  style={{ padding: '0.2rem 0.5rem', fontSize: '0.7rem' }}
                  onClick={() => handleFillDemo(user.email, user.password)}
                >
                  Cargar
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
