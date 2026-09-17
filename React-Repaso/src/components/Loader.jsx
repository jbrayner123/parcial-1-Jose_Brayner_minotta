// src/components/Loader.jsx
// Componente sencillo para mostrar un estado de carga mientras se simula la petición
function Loader() {
  return (
    <div className="loader-container">
      <div className="spinner"></div>
      <p className="loader-text">Cargando contactos...</p>
    </div>
  );
}

export default Loader;
