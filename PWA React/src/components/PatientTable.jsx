import React from 'react';

export default function PatientTable({ patients = [], onDeletePatient }) {
  if (patients.length === 0) {
    return (
      <div className="table-container">
        <div className="empty-state">
          <div className="empty-state-icon" aria-hidden="true">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </div>
          <p className="empty-state-title">No se encontraron registros de pacientes</p>
          <p className="empty-state-text">
            No existen registros que coincidan con los criterios de búsqueda ingresados.
          </p>
        </div>
      </div>
    );
  }

  const getInitials = (first, last) => {
    const f = (first || '').trim()[0] || '';
    const l = (last || '').trim()[0] || '';
    return (f + l).toUpperCase() || 'P';
  };

  return (
    <div className="table-container">
      <table className="patient-table">
        <thead>
          <tr>
            <th scope="col">Paciente</th>
            <th scope="col">Cédula (CC)</th>
            <th scope="col">Teléfono</th>
            <th scope="col">Registro</th>
            <th scope="col" style={{ textAlign: 'right' }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient.id || patient.cc}>
              <td>
                <div className="patient-cell-profile">
                  <div className="patient-avatar" aria-hidden="true">
                    {getInitials(patient.firstName, patient.lastName)}
                  </div>
                  <div>
                    <div className="patient-full-name">
                      {patient.firstName} {patient.lastName}
                    </div>
                    <div className="patient-sub-id">ID: {patient.id || patient.cc}</div>
                  </div>
                </div>
              </td>
              <td>
                <span className="cc-badge">{patient.cc}</span>
              </td>
              <td>
                <span className="patient-phone-text">
                  {patient.phone || 'No registrado'}
                </span>
              </td>
              <td>
                <span className="patient-date-text">
                  {patient.registrationDate || 'N/A'}
                </span>
              </td>
              <td style={{ textAlign: 'right' }}>
                <button
                  type="button"
                  className="btn btn-ghost-danger"
                  onClick={() => onDeletePatient(patient.id || patient.cc)}
                  title="Eliminar este registro"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
