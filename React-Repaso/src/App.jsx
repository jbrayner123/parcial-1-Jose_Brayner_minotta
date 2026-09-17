// src/App.jsx
import { useState, useEffect } from 'react';
import Header from './components/Header';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import Loader from './components/Loader';
import './App.css';

function App() {
  // Estado para la lista de contactos
  const [contacts, setContacts] = useState([]);
  
  // Estado para controlar la pantalla de carga (loader)
  const [isLoading, setIsLoading] = useState(true);

  // useEffect para simular la petición asíncrona a un backend o servicio externo
  useEffect(() => {
    // Simulamos un retraso de 2 segundos (2000 ms)
    const timer = setTimeout(() => {
      const initialContacts = [
        { id: 1, name: 'Carlos Mendoza', phone: '+57 310 456 7890' },
        { id: 2, name: 'Laura Gómez', phone: '+57 315 123 4567' },
        { id: 3, name: 'Andrés Morales', phone: '+57 300 987 6543' },
        { id: 4, name: 'Sofía Herrera', phone: '+57 320 654 9871' },
      ];

      setContacts(initialContacts);
      setIsLoading(false); // Apagamos el loader
    }, 2000);

    // Limpieza del temporizador en caso de que el componente se desmonte
    return () => clearTimeout(timer);
  }, []);

  // Función para agregar un nuevo contacto a la lista
  const handleAddContact = (newContactData) => {
    const newContact = {
      id: Date.now(), // Generamos un id numérico único basado en el timestamp
      ...newContactData,
    };

    // Agregamos el nuevo contacto al inicio de la lista
    setContacts([newContact, ...contacts]);
  };

  // Función para eliminar un contacto por su ID
  const handleDeleteContact = (idToDelete) => {
    const filteredContacts = contacts.filter((contact) => contact.id !== idToDelete);
    setContacts(filteredContacts);
  };

  return (
    <div className="app-wrapper">
      <main className="app-container">
        {/* Encabezado */}
        <Header />

        {/* Renderizado condicional: mostramos el Loader o el contenido principal */}
        {isLoading ? (
          <Loader />
        ) : (
          <div className="content-fade-in">
            {/* Formulario para añadir contactos */}
            <ContactForm onAddContact={handleAddContact} />

            {/* Listado de contactos */}
            <ContactList
              contacts={contacts}
              onDeleteContact={handleDeleteContact}
            />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
