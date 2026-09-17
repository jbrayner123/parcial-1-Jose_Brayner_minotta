# Reto 3: Gestor de Tareas Móvil (Ionic React + Capacitor)

Aplicación móvil desarrollada con **Ionic React** (`@ionic/react`) y **Vite**, orientada a la administración de tareas diarias con soporte nativo Android compilado mediante **Capacitor**.

---

## 🚀 Funcionalidades Implementadas

- **Componentes Nativos Ionic**:
  - Estructura base con `IonApp`, `IonPage`, `IonHeader`, `IonToolbar`, `IonTitle` y `IonContent`.
  - Tarjetas estilizadas con `IonCard`, `IonCardHeader` y `IonCardContent`.
  - Formularios de entrada con `IonItem` e `IonInput`.
  - Lista de tareas construida con `IonList`, `IonItem`, `IonCheckbox` y `IonButton`.
- **Lógica CRUD y Estado**:
  - Creación de nuevas tareas mediante el componente `TaskForm`.
  - Listado y marcado de tareas completadas/pendientes con tachado dinámico y cambio de color mediante `IonCheckbox`.
  - Eliminación individual de tareas con confirmación visual.
  - Insignias dinámicas (`badge-pill`) con el conteo de tareas pendientes y listas.
- **Soporte Android y APK**:
  - Configurado con Capacitor Android (`@capacitor/android`, `@capacitor/cli`).
  - **Instalador APK generado:** [TaskManager.apk](./TaskManager.apk) listo para ser instalado en dispositivos Android reales.

---

## 📱 Instalador APK

Puedes descargar e instalar directamente el instalador móvil:
- **Archivo APK:** [TaskManager.apk](./TaskManager.apk)

---

## 💻 Instrucciones de Ejecución

1. **Instalar dependencias**:
   ```bash
   npm install
   ```

2. **Iniciar en modo desarrollo web**:
   ```bash
   npm run dev
   ```
   Abre `http://localhost:5173/` en tu navegador.

3. **Sincronizar y compilar para Android**:
   ```bash
   npm run build
   npx cap sync android
   npx cap open android
   ```

---

## 👤 Información de Entrega

- **Estudiante**: José Brayner Minotta
- **Repositorio**: [https://github.com/jbrayner123/parcial-1-Jose_Brayner_minotta](https://github.com/jbrayner123/parcial-1-Jose_Brayner_minotta)
- **Rama**: `challenger-03-taskionic`
