// src/pages/Login.tsx
import React, { useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonItem,
  IonInput,
  IonButton,
  IonIcon,
  IonToast,
  IonNote
} from '@ionic/react';
import { logInOutline, lockClosedOutline } from 'ionicons/icons';

interface LoginProps {
  onLoginSuccess: () => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Validación hardcodeada estricta
    if (email.trim() === 'user@mail.com' && password === '123') {
      // 1. Guardamos el estado de sesión en el almacenamiento local
      localStorage.setItem('logged', 'true');

      // 2. Avisamos al componente de enrutamiento para redirigir a la lista
      onLoginSuccess();
    } else {
      // Credenciales inválidas
      setToastMessage('Credenciales incorrectas. Usa: user@mail.com y contraseña: 123');
      setShowToast(true);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Acceso al Sistema</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        <div className="login-wrapper">
          <IonCard className="login-card">
            <IonCardHeader className="ion-text-center">
              <div className="login-icon-container">
                <IonIcon icon={lockClosedOutline} className="login-icon" />
              </div>
              <IonCardTitle>Iniciar Sesión</IonCardTitle>
              <IonCardSubtitle>Ingresa con tus credenciales de prueba</IonCardSubtitle>
            </IonCardHeader>

            <IonCardContent>
              <form onSubmit={handleLogin}>
                <IonItem lines="none" className="custom-input-item">
                  <IonInput
                    label="Correo electrónico"
                    labelPlacement="floating"
                    type="email"
                    placeholder="user@mail.com"
                    value={email}
                    onIonInput={(e) => setEmail(e.detail.value || '')}
                    required
                  />
                </IonItem>

                <IonItem lines="none" className="custom-input-item">
                  <IonInput
                    label="Contraseña"
                    labelPlacement="floating"
                    type="password"
                    placeholder="123"
                    value={password}
                    onIonInput={(e) => setPassword(e.detail.value || '')}
                    required
                  />
                </IonItem>

                <IonButton
                  expand="block"
                  type="submit"
                  className="btn-modern"
                >
                  <IonIcon slot="start" icon={logInOutline} />
                  Ingresar al Sistema
                </IonButton>
              </form>

              <div className="demo-credentials ion-text-center ion-margin-top">
                <IonNote color="medium">
                  <strong>Credenciales demo:</strong><br />
                  Usuario: <code>user@mail.com</code> | Clave: <code>123</code>
                </IonNote>
              </div>
            </IonCardContent>
          </IonCard>
        </div>

        {/* Notificación Toast en caso de credenciales erróneas */}
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={3000}
          color="danger"
          position="top"
        />
      </IonContent>
    </IonPage>
  );
};

export default Login;
