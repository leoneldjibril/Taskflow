import { useState } from "react";
import { IconCalendar, IconFlag, IconPlus } from "../icons";
import styles from "./taskInput.module.css";

export const TaskInput = ({ addTask }) => {
  const [title, setTitle] = useState("");
  const [scheduledAt, setScheduledAt] = useState(""); // Date et heure
  const [priority, setPriority] = useState("moyenne"); // 🆕 Priorité

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    // Envoie un objet contenant le titre, la date et la priorité
    addTask({
      title: title.trim(),
      scheduledAt: scheduledAt || null,
      priority,
    });

    // Réinitialisation des champs
    setTitle("");
    setScheduledAt("");
    setPriority("moyenne");
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Ajouter une tâche..."
        className={styles.input}
      />

      <div className={styles.optionsRow}>
        <label className={styles.field}>
          <IconCalendar className={styles.fieldIcon} width={16} height={16} />
          <input
            type="datetime-local"
            value={scheduledAt}
            onChange={(e) => setScheduledAt(e.target.value)}
            className={styles.dateInput}
          />
        </label>

        <label className={styles.field}>
          <IconFlag className={styles.fieldIcon} width={16} height={16} />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className={styles.select}
          >
            <option value="haute">Haute</option>
            <option value="moyenne">Moyenne</option>
            <option value="basse">Basse</option>
          </select>
        </label>

        <button type="submit" className={`button-primary ${styles.submit}`}>
          <IconPlus width={18} height={18} />
          Ajouter
        </button>
      </div>
    </form>
  );
};
