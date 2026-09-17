// src/pages/List.tsx
import React from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonAvatar,
  IonBadge,
  IonCard,
  IonCardContent
} from '@ionic/react';
import { logOutOutline } from 'ionicons/icons';

interface ListProps {
  onLogout: () => void;
}

const List: React.FC<ListProps> = ({ onLogout }) => {
  // Lista de datos de ejemplo para mostrar en la vista protegida
  const items = [
    { id: 1, title: 'Reunión de proyecto final', category: 'Universidad', status: 'Completado' },
    { id: 2, title: 'Entrega de reto Ionic React', category: 'Desarrollo', status: 'En progreso' },
    { id: 3, title: 'Configuración de Storage y Auth', category: 'Sistemas', status: 'Completado' },
    { id: 4, title: 'Revisión de persistencia con Token', category: 'Pruebas', status: 'Pendiente' },
  ];

  const handleLogout = () => {
    // 1. Limpiamos el token del almacenamiento local
    localStorage.removeItem('logged');

    // 2. Avisamos al padre para redirigir a Login
    onLogout();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Panel Principal</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleLogout} title="Cerrar sesión">
              <IonIcon slot="icon-only" icon={logOutOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        <div className="list-wrapper">
          {/* Banner de bienvenida moderno */}
          <IonCard className="welcome-card-modern">
            <IonCardContent>
              <h2>Sesión Activa</h2>
              <p>Conectado como <strong>user@mail.com</strong></p>
              <IonButton
                color="danger"
                fill="outline"
                size="small"
                onClick={handleLogout}
                className="ion-margin-top"
                style={{ '--border-radius': '10px' }}
              >
                <IonIcon slot="start" icon={logOutOutline} />
                Cerrar sesión
              </IonButton>
            </IonCardContent>
          </IonCard>

          {/* Lista de registros */}
          <div className="modern-list-header">Elementos del Sistema</div>
          <IonList className="modern-list">
            {items.map((item) => (
              <IonItem key={item.id} lines="none" className="modern-item">
                <IonAvatar slot="start" className="modern-avatar">
                  <div className="avatar-letter">{item.title[0]}</div>
                </IonAvatar>

                <IonLabel>
                  <h3 style={{ fontWeight: 600, fontSize: '0.98rem', color: '#0f172a' }}>{item.title}</h3>
                  <p style={{ color: '#64748b' }}>{item.category}</p>
                </IonLabel>

                <IonBadge
                  slot="end"
                  className="modern-badge"
                  color={item.status === 'Completado' ? 'success' : item.status === 'En progreso' ? 'warning' : 'medium'}
                >
                  {item.status}
                </IonBadge>
              </IonItem>
            ))}
          </IonList>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default List;
