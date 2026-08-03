import { useDroppable } from "@dnd-kit/core";
import { KanbanCard } from "./kanbanCard";
import styles from "./kanbanBoard.module.css";

export const KanbanColumn = ({ id, title, tasks, editTask, deleteTask }) => {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div ref={setNodeRef} className={`${styles.column} ${isOver ? styles.columnOver : ""}`}>
      <div className={styles.columnHeader}>
        <h3>{title}</h3>
        <span className={styles.count}>{tasks.length}</span>
      </div>

      <div className={styles.columnBody}>
        {tasks.length === 0 ? (
          <p className={styles.columnEmpty}>Aucune tâche</p>
        ) : (
          tasks.map((task) => (
            <KanbanCard key={task.id} task={task} editTask={editTask} deleteTask={deleteTask} />
          ))
        )}
      </div>
    </div>
  );
};
