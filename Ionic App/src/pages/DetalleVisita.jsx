import React, { useState, useEffect } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonContent,
  IonToast,
  IonIcon,
  IonButton,
  IonSegment,
  IonSegmentButton,
  IonLabel
} from '@ionic/react';
import { useParams, useHistory } from 'react-router-dom';
import { timeOutline, locationOutline, callOutline, documentTextOutline, checkmarkCircleOutline } from 'ionicons/icons';
import { getVisitById, updateVisitStatus } from '../utils/storage';

export default function DetalleVisita() {
  const { id } = useParams();
  const history = useHistory();

  const [visita, setVisita] = useState(null);
  const [estadoSeleccionado, setEstadoSeleccionado] = useState('pendiente');
  const [toastMensaje, setToastMensaje] = useState('');
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const data = getVisitById(id);
    if (data) {
      setVisita(data);
      setEstadoSeleccionado(data.estado);
    }
  }, [id]);

  const handleEstadoChange = (nuevoEstado) => {
    if (!nuevoEstado) return;
    setEstadoSeleccionado(nuevoEstado);
    const actualizado = updateVisitStatus(id, nuevoEstado);

    if (actualizado) {
      setVisita((prev) => (prev ? { ...prev, estado: nuevoEstado } : null));
      const etiqueta = nuevoEstado === 'en_camino' ? 'En camino' : nuevoEstado === 'pendiente' ? 'Pendiente' : 'Finalizada';
      setToastMensaje(`Estado actualizado a: ${etiqueta}`);
      setShowToast(true);
    }
  };

  const getTextoEstado = (estado) => {
    switch (estado) {
      case 'pendiente':
        return 'Pendiente';
      case 'en_camino':
        return 'En camino';
      case 'finalizada':
        return 'Finalizada';
      default:
        return estado;
    }
  };

  if (!visita) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/app/visitas" text="Visitas" />
            </IonButtons>
            <IonTitle>Detalle de Visita</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <div style={{ textAlign: 'center', padding: '48px 20px', color: '#64748B' }}>
            <p style={{ fontWeight: 600, color: '#0F172A', marginBottom: '8px' }}>Registro de visita no encontrado</p>
            <IonButton routerLink="/app/visitas" fill="outline" color="dark">
              Regresar a la agenda
            </IonButton>
          </div>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/app/visitas" text="Visitas" />
          </IonButtons>
          <IonTitle>Ficha de Visita</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen style={{ '--background': '#F8FAFC' }}>
        <div className="visits-container" style={{ padding: '8px 0 24px 0' }}>

          {/* Encabezado del paciente */}
          <div className="detail-section">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Paciente Asignado
                </span>
                <h1 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0F172A', margin: '4px 0 2px 0', letterSpacing: '-0.015em' }}>
                  {visita.paciente}
                </h1>
                <span style={{ fontSize: '0.8rem', color: '#64748B' }}>
                  Folio de Cita: #{visita.id}
                </span>
              </div>
              <span className={`medical-badge ${visita.estado}`}>
                {getTextoEstado(visita.estado)}
              </span>
            </div>
          </div>

          {/* Control de cambio de estado de atención */}
          <div className="detail-section">
            <div className="detail-section-title">
              Estado de la Visita
            </div>
            <p style={{ fontSize: '0.82rem', color: '#64748B', margin: '0 0 12px 0' }}>
              Actualice el estado según el progreso de la atención médica:
            </p>

            <IonSegment
              value={estadoSeleccionado}
              onIonChange={(e) => handleEstadoChange(e.detail.value)}
              className="native-segment"
              style={{ margin: 0 }}
            >
              <IonSegmentButton value="pendiente">
                <IonLabel>Pendiente</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="en_camino">
                <IonLabel>En camino</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="finalizada">
                <IonLabel>Finalizada</IonLabel>
              </IonSegmentButton>
            </IonSegment>
          </div>

          {/* Información detallada de la atención */}
          <div className="detail-section">
            <div className="detail-section-title">
              Detalles del Servicio Domiciliario
            </div>

            <div className="detail-row">
              <IonIcon icon={documentTextOutline} className="detail-icon" />
              <div>
                <div className="detail-label">Motivo de la Consulta</div>
                <div className="detail-val">{visita.motivo}</div>
              </div>
            </div>

            <div className="detail-row">
              <IonIcon icon={timeOutline} className="detail-icon" />
              <div>
                <div className="detail-label">Horario Programado</div>
                <div className="detail-val">{visita.hora}</div>
              </div>
            </div>

            <div className="detail-row">
              <IonIcon icon={locationOutline} className="detail-icon" />
              <div>
                <div className="detail-label">Dirección Domiciliaria</div>
                <div className="detail-val">{visita.direccion}</div>
              </div>
            </div>

            <div className="detail-row">
              <IonIcon icon={callOutline} className="detail-icon" />
              <div style={{ flex: 1 }}>
                <div className="detail-label">Teléfono de Contacto</div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginTop: '2px' }}>
                  <span className="detail-val">{visita.telefono}</span>
                  <IonButton
                    size="small"
                    fill="outline"
                    color="primary"
                    href={`tel:${visita.telefono.replace(/[^0-9+]/g, '')}`}
                    style={{ margin: 0, height: '28px', fontSize: '0.75rem', fontWeight: 600 }}
                  >
                    Llamar
                  </IonButton>
                </div>
              </div>
            </div>
          </div>

          {/* Botón inferior de retorno */}
          <div style={{ padding: '0 12px', marginTop: '16px' }}>
            <IonButton
              expand="block"
              fill="outline"
              color="dark"
              onClick={() => history.push('/app/visitas')}
              style={{ height: '42px', fontWeight: 600 }}
            >
              Volver a la Agenda
            </IonButton>
          </div>
        </div>

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMensaje}
          duration={2000}
          color="dark"
          position="bottom"
        />
      </IonContent>
    </IonPage>
  );
}
