import React from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonList,
  IonItem,
  IonLabel,
  IonIcon
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { personOutline, cardOutline, businessOutline, mailOutline, logOutOutline, checkmarkCircleOutline } from 'ionicons/icons';
import { USUARIO_VALIDO, logoutUser, getVisits } from '../utils/storage';

export default function Perfil() {
  const history = useHistory();
  const visitas = getVisits();

  const handleLogout = () => {
    logoutUser();
    history.replace('/login');
  };

  const finalizadas = visitas.filter((v) => v.estado === 'finalizada').length;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Perfil del Médico</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen style={{ '--background': '#F8FAFC' }}>
        <div className="visits-container" style={{ padding: '12px 0 32px 0' }}>

          {/* Encabezado del facultativo */}
          <div className="detail-section">
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Facultativo Activo
                </span>
                <h1 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0F172A', margin: '4px 0 2px 0', letterSpacing: '-0.015em' }}>
                  {USUARIO_VALIDO.nombre}
                </h1>
                <p style={{ fontSize: '0.85rem', color: '#475569', margin: 0 }}>
                  {USUARIO_VALIDO.especialidad}
                </p>
              </div>
            </div>
          </div>

          {/* Datos profesionales e institucionales */}
          <div className="detail-section">
            <div className="detail-section-title">
              Credenciales Profesionales
            </div>

            <IonList lines="full" style={{ background: 'transparent', padding: 0 }}>
              <IonItem lines="full" style={{ '--padding-start': '0', '--inner-padding-end': '0' }}>
                <IonIcon icon={cardOutline} slot="start" style={{ color: '#64748B', fontSize: '18px' }} />
                <IonLabel>
                  <p style={{ fontSize: '0.78rem', color: '#64748B', margin: 0 }}>Registro Médico (TP)</p>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#0F172A', margin: '2px 0 0 0' }}>
                    {USUARIO_VALIDO.registro}
                  </h3>
                </IonLabel>
              </IonItem>

              <IonItem lines="full" style={{ '--padding-start': '0', '--inner-padding-end': '0' }}>
                <IonIcon icon={businessOutline} slot="start" style={{ color: '#64748B', fontSize: '18px' }} />
                <IonLabel>
                  <p style={{ fontSize: '0.78rem', color: '#64748B', margin: 0 }}>Institución Hospitalaria</p>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#0F172A', margin: '2px 0 0 0' }}>
                    Hospital San Vicente - Red Domiciliaria
                  </h3>
                </IonLabel>
              </IonItem>

              <IonItem lines="none" style={{ '--padding-start': '0', '--inner-padding-end': '0' }}>
                <IonIcon icon={mailOutline} slot="start" style={{ color: '#64748B', fontSize: '18px' }} />
                <IonLabel>
                  <p style={{ fontSize: '0.78rem', color: '#64748B', margin: 0 }}>Correo Institucional</p>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#0F172A', margin: '2px 0 0 0' }}>
                    {USUARIO_VALIDO.email}
                  </h3>
                </IonLabel>
              </IonItem>
            </IonList>
          </div>

          {/* Resumen de jornada */}
          <div className="detail-section">
            <div className="detail-section-title">
              Jornada Actual
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 0' }}>
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#0F172A' }}>
                  Atenciones Concluidas
                </div>
                <div style={{ fontSize: '0.78rem', color: '#64748B', marginTop: '2px' }}>
                  Visitas cerradas con éxito en el turno de hoy
                </div>
              </div>
              <span style={{ fontSize: '1rem', fontWeight: 700, color: '#166534' }}>
                {finalizadas} de {visitas.length}
              </span>
            </div>
          </div>

          {/* Botón de cierre de sesión */}
          <div style={{ padding: '12px 12px 0 12px' }}>
            <IonButton
              expand="block"
              color="danger"
              fill="outline"
              onClick={handleLogout}
              style={{ height: '44px', fontWeight: 600 }}
            >
              <IonIcon icon={logOutOutline} slot="start" />
              Cerrar Sesión
            </IonButton>
          </div>

        </div>
      </IonContent>
    </IonPage>
  );
}
