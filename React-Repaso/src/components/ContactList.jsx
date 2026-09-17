// src/components/ContactList.jsx
import ContactItem from './ContactItem';
import { InboxIcon } from './Icons';

// Contenedor de la lista de contactos (equivalente a un IonList en Ionic)
function ContactList({ contacts, onDeleteContact }) {
  return (
    <section className="list-card">
      <div className="list-header">
        <h2 className="section-title">Mis Contactos</h2>
        <span className="contact-counter">
          {contacts.length} {contacts.length === 1 ? 'contacto' : 'contactos'}
        </span>
      </div>

      {contacts.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">
            <InboxIcon size={40} />
          </div>
          <p className="empty-text">No tienes contactos guardados todavía.</p>
          <span className="empty-subtext">Utiliza el formulario de arriba para agregar uno.</span>
        </div>
      ) : (
        <ul className="contact-list">
          {contacts.map((contact) => (
            <ContactItem
              key={contact.id}
              contact={contact}
              onDelete={onDeleteContact}
            />
          ))}
        </ul>
      )}
    </section>
  );
}

export default ContactList;
