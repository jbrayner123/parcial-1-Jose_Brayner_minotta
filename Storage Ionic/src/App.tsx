// src/App.tsx
import React, { useState, useEffect } from 'react';
import { IonApp, IonLoading } from '@ionic/react';
import Login from './pages/Login';
import List from './pages/List';
import './App.css';

const App: React.FC = () => {
  // Estado que indica si el usuario está autenticado
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  
  // Estado para esperar la verificación inicial del localStorage
  const [isCheckingAuth, setIsCheckingAuth] = useState<boolean>(true);

  // 1. Persistencia y Protección: Verificamos el token al cargar la aplicación
  useEffect(() => {
    const token = localStorage.getItem('logged');

    if (token === 'true') {
      setIsLoggedIn(true); // Redirige directamente a la lista si ya estaba logueado
    } else {
      setIsLoggedIn(false); // Mantiene en la pantalla de Login
    }

    setIsCheckingAuth(false); // Finaliza la comprobación inicial
  }, []);

  // Función ejecutada al iniciar sesión exitosamente desde Login.tsx
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  // Función ejecutada al cerrar sesión desde List.tsx
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  // Mientras verifica el almacenamiento local, evitamos parpadeos de pantalla
  if (isCheckingAuth) {
    return (
      <IonApp>
        <IonLoading isOpen={true} message="Verificando sesión..." spinner="crescent" />
      </IonApp>
    );
  }

  return (
    <IonApp>
      {/* Control de Acceso y Redirección:
          Si tiene token ('logged' === 'true') muestra la página protegida List,
          de lo contrario muestra la página de Login */}
      {isLoggedIn ? (
        <List onLogout={handleLogout} />
      ) : (
        <Login onLoginSuccess={handleLoginSuccess} />
      )}
    </IonApp>
  );
};

export default App;
