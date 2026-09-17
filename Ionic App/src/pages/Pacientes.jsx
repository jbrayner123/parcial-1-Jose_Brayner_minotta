import React, { useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonSearchbar,
  IonBadge
} from '@ionic/react';
import { MOCK_PACIENTES } from '../utils/storage';

export default function Pacientes() {
  const [busqueda, setBusqueda] = useState('');

  const pacientesFiltrados = MOCK_PACIENTES.filter((p) => {
    const query = busqueda.toLowerCase().trim();
    if (!query) return true;
    return (
      p.nombre.toLowerCase().includes(query) ||
      p.cc.toLowerCase().includes(query) ||
      p.eps.toLowerCase().includes(query)
    );
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Directorio de Pacientes</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen style={{ '--background': '#F8FAFC' }}>
        <div className="visits-container" style={{ padding: '8px 0 24px 0' }}>

          {/* Barra de búsqueda nativa */}
          <div style={{ padding: '4px 12px 0 12px' }}>
            <IonSearchbar
              value={busqueda}
              onIonInput={(e) => setBusqueda(e.detail.value || '')}
              placeholder="Buscar por nombre, cédula o EPS..."
              style={{ padding: 0 }}
            />
          </div>

          <div style={{ padding: '8px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Pacientes Registrados
            </span>
            <span style={{ fontSize: '0.78rem', color: '#64748B' }}>
              {pacientesFiltrados.length} {pacientesFiltrados.length === 1 ? 'paciente' : 'pacientes'}
            </span>
          </div>

          {/* Listado limpio de pacientes */}
          <IonList lines="none" style={{ background: 'transparent' }}>
            {pacientesFiltrados.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '48px 20px', color: '#64748B' }}>
                <p style={{ fontWeight: 600, color: '#0F172A', margin: '0 0 6px 0' }}>
                  No se encontraron pacientes
                </p>
                <p style={{ fontSize: '13px', margin: 0 }}>
                  Intente con otro término de búsqueda por nombre o número de documento.
                </p>
              </div>
            ) : (
              pacientesFiltrados.map((paciente) => (
                <IonItem
                  key={paciente.id}
                  className="agenda-item"
                  detail={false}
                  style={{ cursor: 'default' }}
                >
                  <IonLabel style={{ margin: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                      <h2 style={{ fontSize: '1rem', fontWeight: 600, color: '#0F172A', margin: 0 }}>
                        {paciente.nombre}
                      </h2>
                      <IonBadge color="light" style={{ border: '1px solid #E2E8F0', color: '#334155', fontWeight: 600 }}>
                        {paciente.edad} años
                      </IonBadge>
                    </div>

                    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '6px' }}>
                      <span style={{ fontSize: '0.82rem', color: '#475569' }}>
                        CC: <strong style={{ color: '#0F172A', fontFamily: 'monospace' }}>{paciente.cc}</strong>
                      </span>
                      <span style={{ fontSize: '0.82rem', color: '#475569' }}>
                        EPS: <strong style={{ color: '#0F172A' }}>{paciente.eps}</strong>
                      </span>
                      <span style={{ fontSize: '0.82rem', color: '#475569' }}>
                        Tel: <strong style={{ color: '#0F172A' }}>{paciente.telefono}</strong>
                      </span>
                    </div>
                  </IonLabel>
                </IonItem>
              ))
            )}
          </IonList>
        </div>
      </IonContent>
    </IonPage>
  );
}
