import { useState, useEffect, useRef } from "react";
import { Footer } from "./footer/footer";
import { Header } from "./header/header";
import { TaskInput } from "./taskInput/taskInput";
import { TaskList } from "./taskList/taskList";
import { KanbanBoard } from "./kanban/kanbanBoard";
import { Dashboard } from "./dashboard/dashboard";
import { ViewSwitcher } from "./viewSwitcher/viewSwitcher";

const STORAGE_KEY = "tasksList";

// Migration : les tâches sauvegardées avant l'introduction du statut à 3 états
// (todo/doing/done) n'avaient qu'un booléen `completed`. On les fait évoluer
// vers le nouveau modèle sans rien perdre.
const migrateTask = (task) => ({
  ...task,
  status: task.status ?? (task.completed ? "done" : "todo"),
  createdAt: task.createdAt ?? new Date().toISOString(),
  completedAt:
    task.completedAt ?? (task.completed ? task.createdAt ?? new Date().toISOString() : null),
});

// Composant principal qui regroupe toutes les fonctionnalités liées aux tâches
export const TaskContainer = () => {
  const [view, setView] = useState("list");

  const [tasksList, setTasksList] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const parsed = stored ? JSON.parse(stored) : [];
      return parsed.map(migrateTask);
    } catch {
      return [];
    }
  });

  // 💾 Sauvegarde des tâches à chaque changement
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasksList));
  }, [tasksList]);

  // ✅ Ajout de la priorité dans la création de tâche
  const addTask = ({ title, scheduledAt = null, priority = "moyenne" }) => {
    const newTask = {
      id: crypto.randomUUID(),
      title,
      status: "todo", // 🆕 todo / doing / done
      scheduledAt,
      priority,
      createdAt: new Date().toISOString(),
      completedAt: null,
    };
    setTasksList([...tasksList, newTask]);
  };

  // ✅ Mise à jour des tâches (titre, statut, date, priorité, etc.)
  // Le passage à/depuis "done" pose ou efface automatiquement completedAt,
  // pour que le dashboard puisse dater précisément chaque complétion.
  const editTask = (id, updates) => {
    setTasksList(
      tasksList.map((task) => {
        if (task.id !== id) return task;
        const merged = { ...task, ...updates };
        if (updates.status && updates.status !== task.status) {
          merged.completedAt = updates.status === "done" ? new Date().toISOString() : null;
        }
        return merged;
      })
    );
  };

  const deleteTask = (id) => {
    setTasksList(tasksList.filter((task) => task.id !== id));
  };

  const getTaskCounts = () => {
    const completedTask = tasksList.filter((task) => task.status === "done").length;
    const incompletedTask = tasksList.length - completedTask;
    return {
      completedTask,
      incompletedTask,
    };
  };

  // 🔔 Vérification des tâches planifiées pour les notifications
  // notifiedRef retient les tâches déjà notifiées (clé = id + date planifiée)
  // pour éviter de renotifier toutes les 30s tant que la tâche reste dans la fenêtre.
  const notifiedRef = useRef(new Set());

  // tasksListRef donne à l'intervalle un accès à la liste à jour sans avoir
  // à le recréer (et donc perdre jusqu'à 30s de délai) à chaque changement.
  const tasksListRef = useRef(tasksList);
  useEffect(() => {
    tasksListRef.current = tasksList;
  }, [tasksList]);

  // Demande la permission une seule fois (ne re-sollicite pas l'utilisateur
  // à chaque ajout/édition de tâche).
  useEffect(() => {
    if (Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    const checkNotifications = () => {
      const currentTime = new Date();
      tasksListRef.current.forEach((task) => {
        if (task.scheduledAt && task.status !== "done") {
          const notifyKey = `${task.id}-${task.scheduledAt}`;
          const scheduledTime = new Date(task.scheduledAt);
          const timeDiff = scheduledTime - currentTime;

          if (
            timeDiff <= 5 * 60 * 1000 &&
            timeDiff > 0 &&
            !notifiedRef.current.has(notifyKey)
          ) {
            new Notification("🔔 Gestionnaire de tâches", {
              body: `Votre tâche "${task.title}" est prévue dans moins de 5 minutes.`,
            });
            notifiedRef.current.add(notifyKey);
          }
        }
      });
    };

    const intervalId = setInterval(checkNotifications, 30000);
    return () => clearInterval(intervalId);
  }, []);

  const { completedTask, incompletedTask } = getTaskCounts();

  return (
    <main>
      <Header />
      <TaskInput addTask={addTask} />
      <ViewSwitcher view={view} setView={setView} />

      {view === "list" && (
        <TaskList
          tasksList={tasksList}
          editTask={editTask}
          deleteTask={deleteTask}
          incompletedTask={incompletedTask}
        />
      )}

      {view === "kanban" && (
        <KanbanBoard tasksList={tasksList} editTask={editTask} deleteTask={deleteTask} />
      )}

      {view === "dashboard" && <Dashboard tasksList={tasksList} />}

      <Footer completedTask={completedTask} />
    </main>
  );
};
