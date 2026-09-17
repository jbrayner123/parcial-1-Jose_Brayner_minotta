// src/components/Header.jsx
import { ContactsIcon } from './Icons';

// Encabezado de la aplicación (similar a un IonHeader / IonToolbar en Ionic)
function Header() {
  return (
    <header className="app-header">
      <div className="header-icon">
        <ContactsIcon size={24} />
      </div>
      <div>
        <h1 className="header-title">Gestor de Contactos</h1>
        <p className="header-subtitle">Práctica de componentes con React</p>
      </div>
    </header>
  );
}

export default Header;

