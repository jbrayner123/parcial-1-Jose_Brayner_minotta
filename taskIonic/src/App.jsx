// src/App.jsx
import { useState } from 'react';
import {
  IonApp,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent
} from '@ionic/react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './App.css';

// Componente Padre: Administra el estado global de las tareas y la página principal de Ionic
function App() {
  // Estado que contiene el arreglo de tareas
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Instalar Ionic React y configurar Vite', completed: true },
    { id: 2, text: 'Crear componentes TaskForm, TaskList y TaskItem', completed: true },
    { id: 3, text: 'Implementar funciones CRUD con hooks de React', completed: false },
    { id: 4, text: 'Probar la aplicación en el navegador y móvil', completed: false },
  ]);

  // Función para agregar una nueva tarea (recibe datos desde TaskForm)
  const handleAddTask = (taskText) => {
    const newTask = {
      id: Date.now(), // ID numérico único
      text: taskText,
      completed: false, // Por defecto inicia pendiente
    };
    setTasks([newTask, ...tasks]);
  };

  // Función para alternar el estado completado/pendiente (recibe id desde TaskItem)
  const handleToggleTask = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  // Función para eliminar una tarea (recibe id desde TaskItem)
  const handleDeleteTask = (taskId) => {
    const remainingTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(remainingTasks);
  };

  return (
    <IonApp>
      <IonPage>
        {/* Encabezado nativo de Ionic con barra de herramientas */}
        <IonHeader translucent={true}>
          <IonToolbar color="primary">
            <IonTitle>Gestor de Tareas</IonTitle>
          </IonToolbar>
        </IonHeader>

        {/* Área de contenido scrollable nativa de Ionic */}
        <IonContent fullscreen={true} className="ion-padding">
          <div className="container-responsive">
            {/* Componente Hijo 1: Formulario para crear tareas */}
            <TaskForm onAddTask={handleAddTask} />

            {/* Componente Hijo 2: Lista que contiene los ítems de tarea */}
            <TaskList
              tasks={tasks}
              onToggleTask={handleToggleTask}
              onDeleteTask={handleDeleteTask}
            />
          </div>
        </IonContent>
      </IonPage>
    </IonApp>
  );
}

export default App;
