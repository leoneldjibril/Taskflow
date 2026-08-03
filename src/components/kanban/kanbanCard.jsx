import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { IconGripVertical, IconTrash } from "../icons";
import styles from "./kanbanBoard.module.css";

const STATUS_LABEL = { todo: "À faire", doing: "En cours", done: "Terminé" };

export const KanbanCard = ({ task, editTask, deleteTask }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: task.id,
    data: { status: task.status },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.4 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className={`${styles.card} ${styles[`accent-${task.priority}`]}`}>
      <div className={styles.cardHeader}>
        <button
          type="button"
          className={styles.gripHandle}
          aria-label="Glisser pour déplacer la tâche"
          {...listeners}
          {...attributes}
        >
          <IconGripVertical width={14} height={14} />
        </button>
        <div className={styles.cardTitle}>{task.title}</div>
        <button
          type="button"
          className={styles.deleteButton}
          onClick={() => deleteTask(task.id)}
          title="Supprimer la tâche"
          aria-label="Supprimer la tâche"
        >
          <IconTrash width={14} height={14} />
        </button>
      </div>

      {/* Alternative accessible au glisser-déposer (clavier / lecteur d'écran) */}
      <label className={styles.statusSelectWrapper}>
        <span className={styles.srOnly}>Statut de "{task.title}"</span>
        <select
          className={styles.statusSelect}
          value={task.status}
          onChange={(e) => editTask(task.id, { status: e.target.value })}
        >
          {Object.entries(STATUS_LABEL).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};
