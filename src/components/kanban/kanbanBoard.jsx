import { DndContext, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { KanbanColumn } from "./kanbanColumn";
import styles from "./kanbanBoard.module.css";

const COLUMNS = [
  { key: "todo", title: "À faire" },
  { key: "doing", title: "En cours" },
  { key: "done", title: "Terminé" },
];

export const KanbanBoard = ({ tasksList, editTask, deleteTask }) => {
  // Un léger seuil de déplacement évite qu'un simple clic (checkbox, select)
  // soit interprété comme un début de glisser.
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  );

  const handleDragEnd = ({ active, over }) => {
    if (!over) return;
    const newStatus = over.id;
    if (active.data.current?.status !== newStatus) {
      editTask(active.id, { status: newStatus });
    }
  };

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className={styles.board}>
        {COLUMNS.map((column) => (
          <KanbanColumn
            key={column.key}
            id={column.key}
            title={column.title}
            tasks={tasksList.filter((t) => t.status === column.key)}
            editTask={editTask}
            deleteTask={deleteTask}
          />
        ))}
      </div>
    </DndContext>
  );
};
