// src/components/ContactItem.jsx
import { PhoneIcon, TrashIcon } from './Icons';

// Representa una fila/tarjeta de contacto individual (equivalente a un IonItem en Ionic)
function ContactItem({ contact, onDelete }) {
  // Función auxiliar para obtener las iniciales del nombre
  const getInitials = (fullName) => {
    return fullName
      .split(' ')
      .filter(Boolean)
      .map((word) => word[0].toUpperCase())
      .slice(0, 2)
      .join('');
  };

  return (
    <li className="contact-item">
      <div className="contact-avatar">
        {getInitials(contact.name)}
      </div>

      <div className="contact-details">
        <h3 className="contact-name">{contact.name}</h3>
        <p className="contact-phone">
          <PhoneIcon size={14} className="phone-icon-svg" />
          <span>{contact.phone}</span>
        </p>
      </div>

      <button
        type="button"
        className="btn btn-delete"
        onClick={() => onDelete(contact.id)}
        title="Eliminar contacto"
        aria-label={`Eliminar contacto ${contact.name}`}
      >
        <TrashIcon size={18} />
      </button>
    </li>
  );
}

export default ContactItem;
