# 📱 Gestor de Contactos - Progressive Web App (PWA)

Aplicación web desarrollada con **React** y **Vite**, optimizada como **PWA** con estrategia híbrida de almacenamiento en caché y diseño adaptable para dispositivos móviles.

---

## 🌐 Enlace de Despliegue en Netlify

Puedes probar la aplicación en vivo desde cualquier navegador o dispositivo móvil:

🔗 **Demo en producción:** [https://nimble-gumdrop-2e0b83.netlify.app/](https://nimble-gumdrop-2e0b83.netlify.app/)


---

## 📲 Guía de Instalación en Celulares (PWA)

Esta aplicación funciona como una app nativa gracias a su Service Worker y archivo Web Manifest. Para instalarla en tu dispositivo:

### 🤖 En Android (Google Chrome)
1. Abre el enlace de la aplicación en el navegador **Google Chrome**.
2. Deberías ver un banner inferior o un botón flotante que dice **"Instalar aplicación"** o **"Agregar Contactos a la pantalla principal"**.
3. Si el banner no aparece automáticamente:
   - Toca el menú de los **tres puntos** (⋮) en la esquina superior derecha del navegador.
   - Selecciona la opción **"Instalar aplicación"** o **"Agregar a la pantalla principal"**.
   - Presiona **"Instalar"**.
4. ¡Listo! La app se agregará a tu cajón de aplicaciones y pantalla de inicio, funcionando a pantalla completa y sin barra de navegación del navegador.

### 🍏 En iOS / iPhone (Safari)
1. Abre el enlace de la aplicación en el navegador **Safari** (es indispensable usar Safari en iPhone para instalar PWAs).
2. Toca el botón **Compartir** (el icono de un cuadrado con una flecha hacia arriba ⎋ ubicado en la barra inferior).
3. Desplázate hacia abajo en el menú de opciones y selecciona **"Agregar a inicio"** (o *"Add to Home Screen"*).
4. Confirma el nombre de la app (por defecto: *Contactos*) y toca **"Agregar"** en la esquina superior derecha.
5. ¡Listo! Encontrarás el icono personalizado en tu pantalla de inicio y se abrirá en modo autónomo (*standalone*), como una aplicación nativa.

---

## ⚙️ Características Técnicas
- **Estrategia Híbrida de Caché**:
  - **Precaché**: El Service Worker descarga y almacena automáticamente los archivos estáticos de la aplicación (HTML, JavaScript, CSS, imágenes locales) durante la instalación para acceso instantáneo offline.
  - **Runtime Caching**: Intercepta recursos externos en tiempo de ejecución (como Google Fonts e imágenes dinámicas) mediante estrategias `CacheFirst` y `StaleWhileRevalidate`.
- **Estructura Modular**: Componentes `Header`, `ContactForm`, `ContactList`, `ContactItem`, `Loader` e `Icons`.
