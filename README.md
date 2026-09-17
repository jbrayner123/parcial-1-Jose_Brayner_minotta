# Reto 1: Gestor de Contactos (React + Vite)

Aplicación web desarrollada con **React** y **Vite** para la administración de contactos telefónicos personales, implementando arquitectura basada en componentes funcionales modulares y persistencia de estado con Hooks de React.

---

## 🚀 Características Implementadas

- **Componentes Modulares**:
  - `Header`: Encabezado estilizado con icono vectorial, título y subtítulo.
  - `ContactForm`: Formulario reactivo para la captura de nuevo contacto con validaciones de campos obligatorios.
  - `ContactList`: Contenedor de la lista con contador dinámico de contactos registrados.
  - `ContactItem`: Renderizado individual de cada contacto con avatar generado por iniciales y botón de eliminación.
  - `Loader`: Indicador de carga animado simulado con spinner.
  - `Icons`: Iconografía SVG vectorial limpia e integrada.
- **Manejo de Estado con Hooks**:
  - `useState`: Gestión CRUD en memoria (creación, lectura y eliminación de contactos).
  - `useEffect`: Simulación asíncrona de carga de datos iniciales con temporizador de 2 segundos.
- **Diseño Móvil y Limpio**:
  - Contenedor centrado con estilo de tarjeta móvil moderna.
  - Micro-animaciones y efectos visuales de interacción (hover, transiciones suaves).

---

## 💻 Instrucciones de Ejecución

1. **Instalar dependencias**:
   ```bash
   npm install
   ```

2. **Iniciar servidor de desarrollo**:
   ```bash
   npm run dev
   ```

3. **Abrir en el navegador**:
   Visita la URL indicada en la terminal (usualmente `http://localhost:5173/`).

---

## 👤 Información de Entrega

- **Estudiante**: José Brayner Minotta
- **Repositorio**: [https://github.com/jbrayner123/parcial-1-Jose_Brayner_minotta](https://github.com/jbrayner123/parcial-1-Jose_Brayner_minotta)
- **Rama**: `challenger-01-react-repaso`
