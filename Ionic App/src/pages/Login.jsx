import React, { useState, useEffect } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonToast,
  IonIcon
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { medkitOutline, logInOutline } from 'ionicons/icons';
import { loginUser, isAuthenticated, USUARIO_VALIDO } from '../utils/storage';

export default function Login() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (isAuthenticated()) {
      history.replace('/app/visitas');
    }
  }, [history]);

  const handleLogin = (e) => {
    e.preventDefault();
    const exito = loginUser(email, password);

    if (exito) {
      history.replace('/app/visitas');
    } else {
      setShowToast(true);
    }
  };

  const handleAutocompletar = () => {
    setEmail(USUARIO_VALIDO.email);
    setPassword(USUARIO_VALIDO.password);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Atención Domiciliaria</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen style={{ '--background': '#F8FAFC' }}>
        <div style={{ maxWidth: '400px', margin: '36px auto 0 auto', padding: '0 16px' }}>

          {/* Encabezado institucional */}
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <div style={{ display: 'inline-flex', padding: '12px', background: '#EFF6FF', borderRadius: '12px', border: '1px solid #DBEAFE', color: '#1D4ED8', marginBottom: '12px' }}>
              <IonIcon icon={medkitOutline} style={{ fontSize: '32px' }} />
            </div>
            <h1 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#0F172A', margin: '0 0 4px 0', letterSpacing: '-0.02em' }}>
              Hospital San Vicente
            </h1>
            <p style={{ fontSize: '0.85rem', color: '#64748B', margin: 0 }}>
              Módulo de Consulta y Seguimiento de Visitas
            </p>
          </div>

          {/* Formulario de autenticación */}
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '12px',
              border: '1px solid #E2E8F0',
              padding: '20px',
              boxShadow: '0 1px 3px rgba(15, 23, 42, 0.04)'
            }}
          >
            <form onSubmit={handleLogin}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                  Correo institucional
                </label>
                <input
                  type="email"
                  value={email}
                  placeholder="medico@hospital.local"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '11px 12px',
                    fontSize: '0.92rem',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    backgroundColor: '#FFFFFF',
                    color: '#0F172A',
                    colorScheme: 'light',
                    outline: 'none',
                    boxSizing: 'border-box',
                    fontFamily: 'inherit'
                  }}
                />
              </div>

              <div style={{ marginBottom: '22px' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                  Contraseña
                </label>
                <input
                  type="password"
                  value={password}
                  placeholder="Contraseña de acceso"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '11px 12px',
                    fontSize: '0.92rem',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    backgroundColor: '#FFFFFF',
                    color: '#0F172A',
                    colorScheme: 'light',
                    outline: 'none',
                    boxSizing: 'border-box',
                    fontFamily: 'inherit'
                  }}
                />
              </div>

              <IonButton
                expand="block"
                type="submit"
                style={{
                  height: '46px',
                  fontWeight: 600,
                  '--background': '#1D4ED8',
                  '--color': '#FFFFFF',
                  '--border-radius': '8px'
                }}
              >
                <IonIcon icon={logInOutline} slot="start" />
                Ingresar al Sistema
              </IonButton>
            </form>

            {/* Ficha de credenciales de evaluación */}
            <div
              onClick={handleAutocompletar}
              style={{
                marginTop: '20px',
                padding: '12px',
                background: '#F8FAFC',
                borderRadius: '8px',
                border: '1px solid #E2E8F0',
                fontSize: '0.78rem',
                color: '#64748B',
                cursor: 'pointer'
              }}
              title="Pulse aquí para autocompletar credenciales de prueba"
            >
              <div style={{ fontWeight: 600, color: '#0F172A', marginBottom: '4px' }}>
                Credenciales de prueba (clic para autocompletar):
              </div>
              <div>Usuario: <code style={{ color: '#0F172A', fontWeight: 600 }}>{USUARIO_VALIDO.email}</code></div>
              <div>Clave: <code style={{ color: '#0F172A', fontWeight: 600 }}>{USUARIO_VALIDO.password}</code></div>
            </div>
          </div>

        </div>

        {/* Mensaje de error al fallar credenciales */}
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message="Credenciales incorrectas"
          duration={2500}
          color="danger"
          position="bottom"
        />
      </IonContent>
    </IonPage>
  );
}
