// src/components/TaskForm.jsx
import { useState } from 'react';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonInput,
  IonButton,
  IonIcon,
  IonText
} from '@ionic/react';
import { addOutline } from 'ionicons/icons';

// Componente hijo encargado de capturar una nueva tarea
function TaskForm({ onAddTask }) {
  const [taskText, setTaskText] = useState('');
  const [hasError, setHasError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación básica: evitar tareas vacías o solo con espacios
    if (!taskText || !taskText.trim()) {
      setHasError(true);
      return;
    }

    // Enviamos el texto de la tarea al componente padre
    onAddTask(taskText.trim());

    // Limpiamos el campo y el error
    setTaskText('');
    setHasError(false);
  };

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>Nueva Tarea</IonCardTitle>
      </IonCardHeader>

      <IonCardContent>
        <form onSubmit={handleSubmit}>
          <IonItem lines="none" className="task-input-item">
            <IonInput
              label="Descripción de la tarea"
              labelPlacement="floating"
              placeholder="Ej: Repasar hooks de React"
              value={taskText}
              onIonInput={(e) => {
                setTaskText(e.detail.value || '');
                if (hasError) setHasError(false);
              }}
              clearInput={true}
            />
          </IonItem>

          {hasError && (
            <IonText color="danger">
              <p style={{ margin: '8px 0 0 0', fontSize: '0.85rem' }}>
                Por favor escribe una descripción para la tarea.
              </p>
            </IonText>
          )}

          <IonButton
            expand="block"
            type="submit"
            className="btn-add-task"
          >
            <IonIcon slot="start" icon={addOutline} />
            Agregar Tarea
          </IonButton>
        </form>
      </IonCardContent>
    </IonCard>
  );
}

export default TaskForm;
