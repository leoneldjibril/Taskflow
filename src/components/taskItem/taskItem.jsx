import { useRef, useState } from "react";
import { IconCalendar, IconCheck, IconClock, IconEdit, IconFlag, IconTrash } from "../icons";
import styles from "./taskItem.module.css";

const priorityLabel = {
  haute: "Haute",
  moyenne: "Moyenne",
  basse: "Basse",
};

export const TaskItem = ({ task, editTask, deleteTask, number }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);
  const [newDate, setNewDate] = useState(task.scheduledAt || "");
  const [newPriority, setNewPriority] = useState(task.priority || "moyenne");
  const [isAddingDate, setIsAddingDate] = useState(false);
  const cancelledRef = useRef(false);
  const isDone = task.status === "done";
  const showDateInput = Boolean(task.scheduledAt) || isAddingDate;

  const handleTitleUpdate = () => {
    if (cancelledRef.current) {
      cancelledRef.current = false;
      return;
    }
    if (newTitle.trim() && newTitle !== task.title) {
      editTask(task.id, { title: newTitle });
    }
    setIsEditing(false);
  };

  const handleTitleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleTitleUpdate();
    } else if (e.key === "Escape") {
      cancelledRef.current = true;
      setNewTitle(task.title);
      setIsEditing(false);
    }
  };

  // La case à cocher bascule uniquement entre "à faire" et "terminée" ;
  // le statut "en cours" ne se pilote que depuis le tableau Kanban.
  const toggleCompleted = () => editTask(task.id, { status: isDone ? "todo" : "done" });

  const openEdit = () => {
    setNewTitle(task.title);
    setIsEditing(true);
  };

  const handleDateChange = (e) => {
    const newScheduledAt = e.target.value;
    setNewDate(newScheduledAt);
    editTask(task.id, { scheduledAt: newScheduledAt });
  };

  const handlePriorityChange = (e) => {
    const priority = e.target.value;
    setNewPriority(priority);
    editTask(task.id, { priority });
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "haute":
        return styles.priorityHigh;
      case "moyenne":
        return styles.priorityMedium;
      case "basse":
        return styles.priorityLow;
      default:
        return "";
    }
  };

  return (
    <li
      className={`${styles.container} ${isDone ? styles.Success : styles.default} ${styles[`accent-${task.priority}`]}`}
      onClick={toggleCompleted}
    >
      <div className={styles.item}>
        <button
          type="button"
          className={`${styles.checkbox} ${isDone ? styles.checkboxSuccess : styles.checkboxDefault}`}
          role="checkbox"
          aria-checked={isDone}
          aria-label={`Tâche "${task.title}" (priorité ${priorityLabel[task.priority] || task.priority}) — ${isDone ? "complétée" : "à faire"}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleCompleted();
          }}
        >
          {isDone ? <IconCheck width={16} height={16} /> : number}
        </button>

        <div className={styles.content}>
          {isEditing ? (
            <input
              className={styles.inputEdit}
              type="text"
              value={newTitle}
              autoFocus
              onClick={(e) => e.stopPropagation()}
              onChange={(e) => setNewTitle(e.target.value)}
              onBlur={handleTitleUpdate}
              onKeyDown={handleTitleKeyDown}
            />
          ) : (
            <div className={isDone ? styles.titleSuccess : styles.titleDefault}>
              {task.title}
            </div>
          )}

          <div className={styles.meta}>
            {task.status === "doing" && (
              <span className={`${styles.metaField} ${styles.statusDoing}`}>
                <IconClock width={14} height={14} />
                En cours
              </span>
            )}

            {showDateInput ? (
              <label className={styles.metaField} onClick={(e) => e.stopPropagation()}>
                <IconCalendar width={14} height={14} />
                <input
                  type="datetime-local"
                  value={newDate}
                  autoFocus={isAddingDate && !task.scheduledAt}
                  onChange={handleDateChange}
                  onBlur={() => setIsAddingDate(false)}
                  className={styles.dateInput}
                />
              </label>
            ) : (
              <button
                type="button"
                className={styles.addDateButton}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsAddingDate(true);
                }}
              >
                <IconCalendar width={14} height={14} />
                Ajouter une date
              </button>
            )}

            <label
              className={`${styles.metaField} ${styles.prioritySelect} ${getPriorityColor(newPriority)}`}
              onClick={(e) => e.stopPropagation()}
            >
              <IconFlag width={14} height={14} />
              <select
                value={newPriority}
                onChange={handlePriorityChange}
                className={styles.prioritySelectInput}
              >
                <option value="haute">Haute</option>
                <option value="moyenne">Moyenne</option>
                <option value="basse">Basse</option>
              </select>
            </label>
          </div>
        </div>
      </div>

      <div className={styles.actions}>
        <button
          className={`button-primary ${styles.iconButton}`}
          onClick={(e) => {
            e.stopPropagation();
            openEdit();
          }}
          title="Modifier la tâche"
          aria-label="Modifier la tâche"
        >
          <IconEdit width={16} height={16} />
        </button>

        <button
          className={`button-primary ${styles.iconButton}`}
          onClick={(e) => {
            e.stopPropagation();
            deleteTask(task.id);
          }}
          title="Supprimer la tâche"
          aria-label="Supprimer la tâche"
        >
          <IconTrash width={16} height={16} />
        </button>
      </div>
    </li>
  );
};
