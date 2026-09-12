import React from 'react';

export default function SearchBar({ value, onChange, totalCount, filteredCount }) {
  return (
    <div className="search-container">
      <div className="search-input-wrapper">
        <span className="search-icon" aria-hidden="true">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </span>
        <input
          id="patient-search-input"
          type="text"
          className="search-input"
          placeholder="Buscar por nombre, apellido o cédula..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete="off"
        />
        {value.trim() && (
          <button
            type="button"
            className="search-clear-btn"
            onClick={() => onChange('')}
            title="Limpiar búsqueda"
            aria-label="Limpiar búsqueda"
          >
            ×
          </button>
        )}
      </div>

      <div className="search-stats">
        <div className="search-stats-count">
          <span>Resultados: <strong>{filteredCount}</strong> de {totalCount}</span>
        </div>
        {value.trim() && (
          <span className="search-active-indicator">Filtro aplicado</span>
        )}
      </div>
    </div>
  );
}
