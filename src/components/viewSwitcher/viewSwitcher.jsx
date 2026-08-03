import { IconBarChart, IconLayoutGrid, IconListChecks } from "../icons";
import styles from "./viewSwitcher.module.css";

const VIEWS = [
  { key: "list", label: "Liste", icon: IconListChecks },
  { key: "kanban", label: "Tableau", icon: IconLayoutGrid },
  { key: "dashboard", label: "Statistiques", icon: IconBarChart },
];

export const ViewSwitcher = ({ view, setView }) => {
  return (
    <div className={styles.container} role="tablist" aria-label="Changer de vue">
      {VIEWS.map((viewOption) => {
        const Icon = viewOption.icon;
        return (
          <button
            key={viewOption.key}
            type="button"
            role="tab"
            aria-selected={view === viewOption.key}
            className={`${styles.tab} ${view === viewOption.key ? styles.tabActive : ""}`}
            onClick={() => setView(viewOption.key)}
          >
            <Icon width={16} height={16} />
            {viewOption.label}
          </button>
        );
      })}
    </div>
  );
};
