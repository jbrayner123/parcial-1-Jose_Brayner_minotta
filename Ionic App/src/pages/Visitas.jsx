import React, { useState, useEffect } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonSegment,
  IonSegmentButton,
  IonRefresher,
  IonRefresherContent
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { locationOutline, chevronForwardOutline } from 'ionicons/icons';
import { getVisits } from '../utils/storage';

export default function Visitas() {
  const history = useHistory();
  const [visitas, setVisitas] = useState([]);
  const [filtroEstado, setFiltroEstado] = useState('todas');

  const cargarVisitas = () => {
    const lista = getVisits();
    setVisitas(lista);
  };

  useEffect(() => {
    cargarVisitas();
  }, []);

  const handleRefresh = (event) => {
    cargarVisitas();
    event.detail.complete();
  };

  const handleItemClick = (id) => {
    history.push(`/visitas/${id}`);
  };

  const visitasFiltradas = visitas.filter((v) => {
    if (filtroEstado === 'todas') return true;
    return v.estado === filtroEstado;
  });

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

  return (
    <IonPage>
      <IonHeader translucent={false}>
        <IonToolbar>
          <IonTitle>Visitas Médicas</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen style={{ '--background': '#F8FAFC' }}>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent pullingText="Deslizar para actualizar" refreshingSpinner="circles" />
        </IonRefresher>

        <div className="visits-container">
          {/* Selector de filtro por estado */}
          <IonSegment
            value={filtroEstado}
            onIonChange={(e) => setFiltroEstado(e.detail.value)}
            className="native-segment"
          >
            <IonSegmentButton value="todas">
              <IonLabel>Todas</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="pendiente">
              <IonLabel>Pendientes</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="en_camino">
              <IonLabel>En camino</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="finalizada">
              <IonLabel>Finalizadas</IonLabel>
            </IonSegmentButton>
          </IonSegment>

          {/* Listado de visitas médicas del día */}
          <IonList lines="none" style={{ background: 'transparent', padding: '4px 0' }}>
            {visitasFiltradas.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '48px 20px', color: '#64748B' }}>
                <p style={{ fontWeight: 600, color: '#0F172A', margin: '0 0 6px 0', fontSize: '15px' }}>
                  Sin visitas en esta categoría
                </p>
                <p style={{ fontSize: '13px', margin: 0 }}>
                  Seleccione otra pestaña del filtro superior para consultar el resto de la agenda.
                </p>
              </div>
            ) : (
              visitasFiltradas.map((v) => (
                <IonItem
                  key={v.id}
                  button
                  className="agenda-item"
                  onClick={() => handleItemClick(v.id)}
                  detail={false}
                >
                  {/* Columna con la hora programada */}
                  <div className="agenda-time-col">
                    <span className="agenda-time-hour">{v.hora}</span>
                    <span className="agenda-time-label">Cita</span>
                  </div>

                  {/* Datos del paciente y motivo */}
                  <IonLabel style={{ margin: 0, paddingRight: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '4px' }}>
                      <h2 className="agenda-patient-name">{v.paciente}</h2>
                      <span className={`medical-badge ${v.estado}`}>
                        {getTextoEstado(v.estado)}
                      </span>
                    </div>

                    <p className="agenda-reason">{v.motivo}</p>

                    <p className="agenda-address">
                      <IonIcon icon={locationOutline} style={{ fontSize: '14px', flexShrink: 0 }} />
                      <span>{v.direccion}</span>
                    </p>
                  </IonLabel>

                  <IonIcon
                    slot="end"
                    icon={chevronForwardOutline}
                    style={{ color: '#94A3B8', fontSize: '18px', marginLeft: '4px' }}
                  />
                </IonItem>
              ))
            )}
          </IonList>
        </div>
      </IonContent>
    </IonPage>
  );
}
