# Challengers Móvil

Repositorio que recopila los diferentes retos prácticos de desarrollo web y móvil desarrollados con **React**, **Vite** e **Ionic React**.

---

## 📁 Proyectos incluidos

### 1. [React-Repaso](./React-Repaso)
- Gestor de contactos personal desarrollado con **React + Vite**.
- Componentes funcionales modulares (`Header`, `ContactForm`, `ContactList`, `ContactItem`, `Loader`).
- Estado de carga simulado asíncrono con `useEffect` y `setTimeout`.
- Manejo de estado CRUD (agregar y eliminar contactos) con `useState`.
- Iconos vectoriales SVG ligeros y diseño limpio tipo tarjeta.

### 2. [PWA](./PWA)
- Evolución del gestor de contactos como **Progressive Web App (PWA)** utilizando `vite-plugin-pwa`.
- **Estrategia Híbrida de Caché:** Precaché para assets locales y Runtime Caching para fuentes de Google e imágenes.
- Web App Manifest configurado con iconos adaptables (192px y 512px maskable).
- **Demo en vivo desplegada en Netlify:** [https://nimble-gumdrop-2e0b83.netlify.app/](https://nimble-gumdrop-2e0b83.netlify.app/)

### 3. [taskIonic](./taskIonic)
- Aplicación móvil de **Gestor de Tareas** desarrollada con **Ionic React (@ionic/react)**.
- Construida estrictamente con componentes nativos de Ionic (`IonPage`, `IonHeader`, `IonToolbar`, `IonContent`, `IonCard`, `IonList`, `IonItem`, `IonCheckbox`, `IonButton`).
- Funcionalidades: agregar tareas, marcar como completadas (tachado dinámico) y eliminar tareas.
- Configurada con **Capacitor** para Android.
- **APK compilado disponible:** [TaskManager.apk](./taskIonic/TaskManager.apk)

### 4. [Storage Ionic](./Storage%20Ionic)
- Demostración de **Autenticación, Storage y Protección de Rutas** en **Ionic React + TypeScript**.
- Pantalla de Login con validación de credenciales (`user@mail.com` / `123`).
- Almacenamiento de token de sesión en `localStorage` (`logged = true`).
- Protección de ruta y persistencia con `useEffect` para mantener la sesión activa al recargar la app.
- Pantalla protegida con listado de datos y botón de cierre de sesión (Logout).
