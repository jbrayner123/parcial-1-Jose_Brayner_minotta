// src/components/ContactForm.jsx
import { useState } from 'react';
import { PlusIcon } from './Icons';

// Formulario para agregar nuevos contactos
function ContactForm({ onAddContact }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación básica: que los campos no estén vacíos
    if (!name.trim() || !phone.trim()) {
      setError('Por favor completa tanto el nombre como el teléfono.');
      return;
    }

    // Pasamos los datos al componente padre
    onAddContact({
      name: name.trim(),
      phone: phone.trim(),
    });

    // Limpiamos el formulario y los errores
    setName('');
    setPhone('');
    setError('');
  };

  return (
    <section className="form-card">
      <h2 className="section-title">Nuevo Contacto</h2>
      
      {error && <div className="error-alert">{error}</div>}

      <form onSubmit={handleSubmit} className="contact-form">
        <div className="input-group">
          <label htmlFor="name">Nombre completo</label>
          <input
            id="name"
            type="text"
            placeholder="Ej. Ana Martínez"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label htmlFor="phone">Número de teléfono</label>
          <input
            id="phone"
            type="tel"
            placeholder="Ej. +57 301 234 5678"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          <PlusIcon size={18} />
          <span>Agregar Contacto</span>
        </button>
      </form>
    </section>
  );
}

export default ContactForm;
