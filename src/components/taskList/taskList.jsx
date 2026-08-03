import { useState } from "react";
import { TaskItem } from "../taskItem/taskItem";
import { IconCheck, IconCircleDashed, IconListChecks, IconParty } from "../icons";
import style from "./taskList.module.css";

// Définition de l'ordre des priorités
const priorityOrder = {
  haute: 1,
  moyenne: 2,
  basse: 3,
};

const FILTERS = [
  { key: "all", label: "Toutes", icon: IconListChecks },
  { key: "active", label: "Actives", icon: IconCircleDashed },
  { key: "completed", label: "Complétées", icon: IconCheck },
];

export const TaskList = ({
  tasksList,
  incompletedTask,
  editTask,
  deleteTask,
}) => {
  const [filter, setFilter] = useState("all");

  // Trie les tâches par priorité, puis par date planifiée la plus proche
  // (les tâches sans date passent après celles qui en ont une)
  const sortedTasks = [...tasksList].sort((a, b) => {
    const priorityDiff =
      (priorityOrder[a.priority] ?? 99) - (priorityOrder[b.priority] ?? 99);
    if (priorityDiff !== 0) return priorityDiff;

    if (a.scheduledAt && b.scheduledAt) {
      return new Date(a.scheduledAt) - new Date(b.scheduledAt);
    }
    if (a.scheduledAt) return -1;
    if (b.scheduledAt) return 1;
    return 0;
  });

  const filteredTasks = sortedTasks.filter((task) => {
    if (filter === "active") return task.status !== "done";
    if (filter === "completed") return task.status === "done";
    return true;
  });

  // Rendu des tâches avec numérotation basée sur le tri
  const taskList = filteredTasks.map((task, index) => {
    const taskNumber = index + 1;
    return (
      <TaskItem
        key={task.id}
        task={task}
        editTask={editTask}
        deleteTask={deleteTask}
        number={taskNumber}
      />
    );
  });

  if (tasksList.length === 0) {
    return (
      <div className="box">
        <h2 className={style.emptyState}>
          <IconListChecks width={22} height={22} />
          Bienvenue sur Le Gestionnaire des Tâches, quels sont vos objectifs
          d'aujourd'hui ?
        </h2>
      </div>
    );
  }

  return (
    <div>
      {/* Message principal */}
      <h2 className={style.title}>
        {incompletedTask > 0 ? (
          <>
            Il vous reste encore{" "}
            <span className="important">{incompletedTask}</span> tâche
            {incompletedTask > 1 ? "s" : ""} à accomplir !
          </>
        ) : (
          <span className={style.titleWithIcon}>
            <IconParty width={20} height={20} />
            Bravo, vous avez accompli toutes vos tâches !
          </span>
        )}
      </h2>

      {/* Filtres de vue */}
      <div className={style.filters} role="group" aria-label="Filtrer les tâches">
        {FILTERS.map((filterOption) => {
          const Icon = filterOption.icon;
          return (
            <button
              key={filterOption.key}
              type="button"
              className={`${style.filterButton} ${filter === filterOption.key ? style.filterButtonActive : ""}`}
              aria-pressed={filter === filterOption.key}
              onClick={() => setFilter(filterOption.key)}
            >
              <Icon width={14} height={14} />
              {filterOption.label}
            </button>
          );
        })}
      </div>

      {/* Affichage des tâches ou message si le filtre ne retient rien */}
      {taskList.length > 0 ? (
        <ul className={style.container}>{taskList}</ul>
      ) : (
        <div className="box">
          <h2 className={style.emptyState}>Aucune tâche dans ce filtre.</h2>
        </div>
      )}
    </div>
  );
};
