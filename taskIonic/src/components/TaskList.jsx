// src/components/TaskList.jsx
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonList,
  IonItem,
  IonLabel,
  IonBadge,
  IonText
} from '@ionic/react';
import TaskItem from './TaskItem';

// Componente hijo que agrupa la lista de tareas y muestra estadísticas
function TaskList({ tasks, onToggleTask, onDeleteTask }) {
  const completedCount = tasks.filter((t) => t.completed).length;
  const pendingCount = tasks.length - completedCount;

  return (
    <IonCard>
      <IonCardHeader>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <IonCardTitle>Mis Tareas</IonCardTitle>
          <div style={{ display: 'flex', gap: '8px' }}>
            <IonBadge color="primary" className="badge-pill">
              {pendingCount} pendientes
            </IonBadge>
            <IonBadge color="success" className="badge-pill">
              {completedCount} listas
            </IonBadge>
          </div>
        </div>
      </IonCardHeader>

      <IonList lines="full">
        {tasks.length === 0 ? (
          <IonItem lines="none" className="ion-text-center">
            <IonLabel color="medium">
              <p style={{ padding: '24px 0', fontSize: '1rem' }}>
                No tienes tareas registradas. ¡Agrega una arriba!
              </p>
            </IonLabel>
          </IonItem>
        ) : (
          tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggleTask={onToggleTask}
              onDeleteTask={onDeleteTask}
            />
          ))
        )}
      </IonList>
    </IonCard>
  );
}

export default TaskList;
