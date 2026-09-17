# Reto 4: Autenticación, LocalStorage y Rutas Protegidas (Ionic React + TypeScript)

Aplicación móvil desarrollada con **Ionic React**, **TypeScript** y **Vite**, que implementa un flujo completo de autenticación de usuario, persistencia de sesión en el almacenamiento local del navegador (`localStorage`) y protección de rutas.

---

## 🚀 Funcionalidades Implementadas

- **Autenticación (Login)**:
  - Formulario de inicio de sesión con validación de credenciales.
  - Almacenamiento seguro del token de sesión en `localStorage` (`logged = true`).
  - Alerta flotante mediante `IonToast` en caso de credenciales incorrectas.
- **Protección de Rutas y Persistencia**:
  - `useEffect` para la verificación automática del token al iniciar la app.
  - Si la sesión está activa (`logged === 'true'`), el usuario es dirigido directamente a la pantalla protegida `List`.
  - Pantalla de carga con `IonLoading` ("Verificando sesión...") para evitar parpadeos visuales durante la validación.
- **Pantalla Protegida (`List`) y Cierre de Sesión (Logout)**:
  - Lista de elementos con avatares dinámicos y estados mediante insignias `IonBadge`.
  - Botón de cierre de sesión en la barra de herramientas (`IonToolbar`) que elimina el token de `localStorage` y redirige a la pantalla de Login.

---

## 🔑 Credenciales de Prueba

- **Usuario:** `user@mail.com`
- **Contraseña:** `123`

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
   Abre `http://localhost:5173/` en tu navegador.

---

## 👤 Información de Entrega

- **Estudiante**: José Brayner Minotta
- **Repositorio**: [https://github.com/jbrayner123/parcial-1-Jose_Brayner_minotta](https://github.com/jbrayner123/parcial-1-Jose_Brayner_minotta)
- **Rama**: `challenger-04-storage-ionic`
