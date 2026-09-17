// src/components/TaskItem.jsx
import {
  IonItem,
  IonCheckbox,
  IonLabel,
  IonButton,
  IonIcon,
  IonNote
} from '@ionic/react';
import { trashOutline } from 'ionicons/icons';

// Componente hijo que representa un elemento individual de la lista
function TaskItem({ task, onToggleTask, onDeleteTask }) {
  return (
    <IonItem lines="full" className="task-item-modern">
      {/* Checkbox nativo de Ionic para marcar como completada */}
      <IonCheckbox
        slot="start"
        checked={task.completed}
        onIonChange={() => onToggleTask(task.id)}
        aria-label={`Marcar como completada ${task.text}`}
      />

      {/* Etiqueta con texto tachado condicionalmente */}
      <IonLabel
        style={{
          textDecoration: task.completed ? 'line-through' : 'none',
          opacity: task.completed ? 0.5 : 1,
          transition: 'all 0.2s ease',
        }}
      >
        <h2 style={{ fontWeight: 600, fontSize: '0.98rem' }}>{task.text}</h2>
        <IonNote color={task.completed ? 'success' : 'medium'}>
          {task.completed ? 'Completada' : 'Pendiente'}
        </IonNote>
      </IonLabel>

      {/* Botón nativo de Ionic para eliminar la tarea */}
      <IonButton
        slot="end"
        fill="clear"
        className="btn-delete-task"
        onClick={() => onDeleteTask(task.id)}
        title="Eliminar tarea"
        aria-label="Eliminar tarea"
      >
        <IonIcon slot="icon-only" icon={trashOutline} />
      </IonButton>
    </IonItem>
  );
}

export default TaskItem;
