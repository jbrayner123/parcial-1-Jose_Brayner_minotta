import React, { useState, useEffect, useMemo } from 'react';
import Header from '../components/Header';
import PatientForm from '../components/PatientForm';
import PatientTable from '../components/PatientTable';
import SearchBar from '../components/SearchBar';
import { INITIAL_PATIENTS } from '../data/initialPatients';

export default function DashboardPage({ user, onLogout }) {
  // 1. Estado principal de pacientes con persistencia en localStorage ('patients_data')
  const [patients, setPatients] = useState(() => {
    try {
      const stored = localStorage.getItem('patients_data');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch (err) {
      console.error('Error al recuperar pacientes de localStorage:', err);
    }
    return INITIAL_PATIENTS;
  });

  // Guardar en localStorage cada vez que la lista de pacientes cambie
  useEffect(() => {
    try {
      localStorage.setItem('patients_data', JSON.stringify(patients));
    } catch (err) {
      console.error('Error al guardar pacientes en localStorage:', err);
    }
  }, [patients]);

  // 2. ARQUITECTURA OBLIGATORIA: Estado del término de búsqueda en el componente padre
  const [searchTerm, setSearchTerm] = useState('');

  // 3. ARQUITECTURA OBLIGATORIA: La lista filtrada reside y se calcula en el componente padre
  const filteredPatients = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) {
      return patients;
    }

    return patients.filter((patient) => {
      const firstNameMatch = (patient.firstName || '').toLowerCase().includes(term);
      const lastNameMatch = (patient.lastName || '').toLowerCase().includes(term);
      const ccMatch = (patient.cc || '').toLowerCase().includes(term);

      return firstNameMatch || lastNameMatch || ccMatch;
    });
  }, [patients, searchTerm]);

  // Manejador para registrar nuevos pacientes
  const handleAddPatient = (newPatient) => {
    setPatients((prev) => [newPatient, ...prev]);
  };

  // Manejador para eliminar un paciente por ID o CC
  const handleDeletePatient = (identifier) => {
    const confirmDelete = window.confirm('¿Desea confirmar la eliminación de este registro clínico?');
    if (!confirmDelete) return;

    setPatients((prev) => prev.filter((p) => p.id !== identifier && p.cc !== identifier));
  };

  // Lista de CCs existentes para validación de unicidad en el formulario
  const existingCCs = useMemo(() => {
    return patients.map((p) => String(p.cc).trim());
  }, [patients]);

  return (
    <div className="app-container">
      <Header user={user} onLogout={onLogout} />

      <main className="main-wrapper">
        <section className="page-intro">
          <h2 className="page-title">Panel de Administración Clínica</h2>
          <p className="page-description">
            Gestión y búsqueda en tiempo real de registros de pacientes con almacenamiento local persistente.
          </p>
        </section>

        {/* Métricas de resumen estilo PWA */}
        <section className="metrics-strip" aria-label="Métricas de resumen">
          <div className="metric-pill">
            <span className="metric-pill-label">Total Pacientes</span>
            <div className="metric-pill-value">{patients.length}</div>
            <div className="metric-pill-badge">
              <span className="metric-dot" aria-hidden="true"></span>
              <span>Almacenamiento Local</span>
            </div>
          </div>

          <div className="metric-pill">
            <span className="metric-pill-label">Registros Filtrados</span>
            <div className="metric-pill-value">{filteredPatients.length}</div>
            <div className="metric-pill-badge">
              <span>{searchTerm.trim() ? 'Filtro activo' : 'Directorio completo'}</span>
            </div>
          </div>

          <div className="metric-pill">
            <span className="metric-pill-label">Estado de la Base</span>
            <div className="metric-pill-value" style={{ fontSize: '1.1rem', fontWeight: 600 }}>Sincronizada</div>
            <div className="metric-pill-badge">
              <span>localStorage: patients_data</span>
            </div>
          </div>
        </section>

        <div className="dashboard-grid">
          {/* Columna Izquierda: Formulario de Registro */}
          <section aria-labelledby="registro-paciente-title">
            <PatientForm onAddPatient={handleAddPatient} existingCCs={existingCCs} />
          </section>

          {/* Columna Derecha: Búsqueda y Tabla de Pacientes */}
          <section aria-labelledby="listado-pacientes-title">
            <div className="card">
              <div className="card-header-clean">
                <h3 id="listado-pacientes-title" className="card-title">Directorio de Pacientes</h3>
                <p className="card-subtitle">Consulte o filtre registros médicos ingresados en el sistema.</p>
              </div>

              {/* Barra de búsqueda controlada por el padre */}
              <SearchBar
                value={searchTerm}
                onChange={setSearchTerm}
                totalCount={patients.length}
                filteredCount={filteredPatients.length}
              />

              {/* ARQUITECTURA OBLIGATORIA: Pasar la lista filtrada por props al componente hijo */}
              <PatientTable
                patients={filteredPatients}
                onDeletePatient={handleDeletePatient}
              />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
