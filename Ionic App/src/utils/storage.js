const STORAGE_KEY_AUTH = 'ionic_auth_session';
const STORAGE_KEY_VISITAS = 'ionic_visitas_data';

// Usuario fijo para pruebas según requerimiento
export const USUARIO_VALIDO = {
  email: 'medico@hospital.local',
  password: '123456',
  nombre: 'Dr. Roberto Silva',
  especialidad: 'Medicina General',
  registro: 'RM-54210'
};

// Datos iniciales de ejemplo para consultas con tildes correctas
const MOCK_VISITAS_INICIALES = [
  {
    id: '1',
    paciente: 'Carlos Gómez',
    hora: '08:30 AM',
    direccion: 'Calle 45 #12-30',
    telefono: '3001234567',
    motivo: 'Control de presión arterial y ajuste de dosis',
    estado: 'pendiente'
  },
  {
    id: '2',
    paciente: 'Mariana Restrepo',
    hora: '10:00 AM',
    direccion: 'Carrera 7 #80-15',
    telefono: '3109876543',
    motivo: 'Curación y revisión de herida quirúrgica',
    estado: 'en_camino'
  },
  {
    id: '3',
    paciente: 'Andrés Vargas',
    hora: '11:45 AM',
    direccion: 'Avenida 19 #104-50',
    telefono: '3157654321',
    motivo: 'Evaluación de dolor lumbar agudo',
    estado: 'finalizada'
  },
  {
    id: '4',
    paciente: 'Lucía Morales',
    hora: '02:15 PM',
    direccion: 'Diagonal 40 #22-10',
    telefono: '3185551234',
    motivo: 'Entrega e interpretación de exámenes de laboratorio',
    estado: 'pendiente'
  }
];

// Lista básica de pacientes de ejemplo para la pestaña Pacientes
export const MOCK_PACIENTES = [
  { id: '1', nombre: 'Carlos Gómez', cc: '1020304050', edad: 45, eps: 'Sanitas' },
  { id: '2', nombre: 'Mariana Restrepo', cc: '1098765432', edad: 32, eps: 'Compensar' },
  { id: '3', nombre: 'Andrés Vargas', cc: '79654123', edad: 58, eps: 'Sura' },
  { id: '4', nombre: 'Lucía Morales', cc: '52341987', edad: 29, eps: 'Famisanar' },
  { id: '5', nombre: 'Jorge Ramírez', cc: '14892301', edad: 67, eps: 'Nueva EPS' }
];

// Inicializar almacenamiento si no existen visitas
export function initStorage() {
  const guardado = localStorage.getItem(STORAGE_KEY_VISITAS);
  if (!guardado) {
    localStorage.setItem(STORAGE_KEY_VISITAS, JSON.stringify(MOCK_VISITAS_INICIALES));
  }
}

// Obtener lista completa de visitas
export function getVisits() {
  initStorage();
  try {
    const data = localStorage.getItem(STORAGE_KEY_VISITAS);
    return data ? JSON.parse(data) : MOCK_VISITAS_INICIALES;
  } catch (error) {
    console.error('Error al leer visitas de localStorage:', error);
    return MOCK_VISITAS_INICIALES;
  }
}

// Obtener una visita por su identificador
export function getVisitById(id) {
  const visitas = getVisits();
  return visitas.find((v) => String(v.id) === String(id)) || null;
}

// Actualizar el estado de una visita
export function updateVisitStatus(id, nuevoEstado) {
  const estadosValidos = ['pendiente', 'en_camino', 'finalizada'];
  if (!estadosValidos.includes(nuevoEstado)) {
    console.warn('Estado no permitido:', nuevoEstado);
    return false;
  }

  const visitas = getVisits();
  const index = visitas.findIndex((v) => String(v.id) === String(id));

  if (index === -1) {
    return false;
  }

  visitas[index].estado = nuevoEstado;
  localStorage.setItem(STORAGE_KEY_VISITAS, JSON.stringify(visitas));
  return true;
}

// Funciones de sesión / autenticación
export function isAuthenticated() {
  return localStorage.getItem(STORAGE_KEY_AUTH) !== null;
}

export function loginUser(email, password) {
  const cleanEmail = (email || '').trim().toLowerCase();
  const cleanPass = (password || '').trim();

  if (cleanEmail === USUARIO_VALIDO.email.toLowerCase() && cleanPass === USUARIO_VALIDO.password) {
    const sesion = {
      email: USUARIO_VALIDO.email,
      nombre: USUARIO_VALIDO.nombre,
      token: 'session_token_' + Date.now()
    };
    localStorage.setItem(STORAGE_KEY_AUTH, JSON.stringify(sesion));
    return true;
  }

  return false;
}

export function logoutUser() {
  localStorage.removeItem(STORAGE_KEY_AUTH);
}

export function getCurrentUser() {
  try {
    const data = localStorage.getItem(STORAGE_KEY_AUTH);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    return null;
  }
}
