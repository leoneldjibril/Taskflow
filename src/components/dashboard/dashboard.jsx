import { useMemo, useState } from "react";
import { IconBarChart } from "../icons";
import styles from "./dashboard.module.css";

const PRIORITIES = [
  { key: "haute", label: "Haute", color: "#e74c3c" },
  { key: "moyenne", label: "Moyenne", color: "#f39c12" },
  { key: "basse", label: "Basse", color: "#2ecc71" },
];

const TREND_COLOR = "#2870ff";
const DAY_LABELS = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];

// Construit un rectangle dont seuls les coins "extrémité de la donnée"
// sont arrondis (4px), l'extrémité posée sur la ligne de base restant carrée.
const roundedBarPath = (x, y, w, h, r, orientation) => {
  const radius = Math.min(r, w / 2, h / 2);
  if (orientation === "vertical") {
    // Arrondi en haut (la valeur), carré en bas (la ligne de base)
    return `M ${x} ${y + h} L ${x} ${y + radius} Q ${x} ${y} ${x + radius} ${y} L ${x + w - radius} ${y} Q ${x + w} ${y} ${x + w} ${y + radius} L ${x + w} ${y + h} Z`;
  }
  // Arrondi à droite (la valeur), carré à gauche (la ligne de base)
  return `M ${x} ${y} L ${x + w - radius} ${y} Q ${x + w} ${y} ${x + w} ${y + radius} L ${x + w} ${y + h - radius} Q ${x + w} ${y + h} ${x + w - radius} ${y + h} L ${x} ${y + h} Z`;
};

const StatTile = ({ label, value }) => (
  <div className={styles.tile}>
    <div className={styles.tileValue}>{value}</div>
    <div className={styles.tileLabel}>{label}</div>
  </div>
);

const useTooltip = () => {
  const [tooltip, setTooltip] = useState(null);
  return {
    tooltip,
    show: (e, content) => {
      const rect = e.currentTarget.closest("svg").getBoundingClientRect();
      setTooltip({ x: e.clientX - rect.left, y: e.clientY - rect.top, content });
    },
    hide: () => setTooltip(null),
  };
};

const PriorityChart = ({ tasksList }) => {
  const { tooltip, show, hide } = useTooltip();
  const counts = PRIORITIES.map((p) => ({
    ...p,
    count: tasksList.filter((t) => t.priority === p.key).length,
  }));
  const max = Math.max(...counts.map((c) => c.count), 1);

  const width = 420;
  const barHeight = 22;
  const gap = 20;
  const leftLabelWidth = 70;
  const chartWidth = width - leftLabelWidth - 40;
  const height = counts.length * (barHeight + gap);

  return (
    <div className={styles.chartCard}>
      <h3 className={styles.chartTitle}>Répartition par priorité</h3>
      <svg viewBox={`0 0 ${width} ${height}`} className={styles.svg} role="img" aria-label="Répartition des tâches par priorité">
        <line
          x1={leftLabelWidth}
          y1={0}
          x2={leftLabelWidth}
          y2={height}
          className={styles.axisLine}
        />
        {counts.map((c, i) => {
          const barW = (c.count / max) * chartWidth;
          const y = i * (barHeight + gap) + gap / 2;
          return (
            <g key={c.key}>
              <text
                x={leftLabelWidth - 10}
                y={y + barHeight / 2}
                textAnchor="end"
                dominantBaseline="middle"
                className={styles.axisLabel}
              >
                {c.label}
              </text>
              <path
                d={roundedBarPath(leftLabelWidth, y, Math.max(barW, 2), barHeight, 4, "horizontal")}
                fill={c.color}
                onMouseEnter={(e) => show(e, `${c.label} : ${c.count} tâche${c.count > 1 ? "s" : ""}`)}
                onMouseLeave={hide}
                style={{ cursor: "pointer" }}
              />
              <text
                x={leftLabelWidth + Math.max(barW, 2) + 8}
                y={y + barHeight / 2}
                dominantBaseline="middle"
                className={styles.valueLabel}
              >
                {c.count}
              </text>
            </g>
          );
        })}
      </svg>
      {tooltip && (
        <div className={styles.tooltip} style={{ left: tooltip.x + 12, top: tooltip.y }}>
          {tooltip.content}
        </div>
      )}
    </div>
  );
};

const TrendChart = ({ tasksList }) => {
  const { tooltip, show, hide } = useTooltip();

  const days = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(today);
      d.setDate(d.getDate() - (6 - i));
      return d;
    });
  }, []);

  const counts = days.map((day) => {
    const count = tasksList.filter((t) => {
      if (!t.completedAt) return false;
      const completed = new Date(t.completedAt);
      return (
        completed.getFullYear() === day.getFullYear() &&
        completed.getMonth() === day.getMonth() &&
        completed.getDate() === day.getDate()
      );
    }).length;
    return { day, count };
  });

  const totalCompleted = counts.reduce((sum, c) => sum + c.count, 0);
  const max = Math.max(...counts.map((c) => c.count), 1);

  const width = 420;
  const height = 180;
  const barWidth = 24;
  const gap = (width - counts.length * barWidth) / (counts.length + 1);
  const chartBottom = height - 24;
  const chartTop = 20;
  const usableHeight = chartBottom - chartTop;

  if (totalCompleted === 0) {
    return (
      <div className={styles.chartCard}>
        <h3 className={styles.chartTitle}>Tâches complétées (7 derniers jours)</h3>
        <p className={styles.emptyChart}>Aucune tâche complétée pour l'instant.</p>
      </div>
    );
  }

  return (
    <div className={styles.chartCard}>
      <h3 className={styles.chartTitle}>Tâches complétées (7 derniers jours)</h3>
      <svg viewBox={`0 0 ${width} ${height}`} className={styles.svg} role="img" aria-label="Tâches complétées lors des 7 derniers jours">
        <line x1={0} y1={chartBottom} x2={width} y2={chartBottom} className={styles.baseline} />
        {counts.map((c, i) => {
          const barH = (c.count / max) * usableHeight;
          const x = gap + i * (barWidth + gap);
          const y = chartBottom - barH;
          return (
            <g key={i}>
              {c.count > 0 && (
                <path
                  d={roundedBarPath(x, y, barWidth, barH, 4, "vertical")}
                  fill={TREND_COLOR}
                  onMouseEnter={(e) =>
                    show(
                      e,
                      `${c.day.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "short" })} : ${c.count} tâche${c.count > 1 ? "s" : ""}`
                    )
                  }
                  onMouseLeave={hide}
                  style={{ cursor: "pointer" }}
                />
              )}
              {c.count > 0 && (
                <text x={x + barWidth / 2} y={y - 6} textAnchor="middle" className={styles.valueLabel}>
                  {c.count}
                </text>
              )}
              <text
                x={x + barWidth / 2}
                y={chartBottom + 16}
                textAnchor="middle"
                className={styles.axisLabel}
              >
                {DAY_LABELS[c.day.getDay()]}
              </text>
            </g>
          );
        })}
      </svg>
      {tooltip && (
        <div className={styles.tooltip} style={{ left: tooltip.x + 12, top: tooltip.y }}>
          {tooltip.content}
        </div>
      )}
    </div>
  );
};

export const Dashboard = ({ tasksList }) => {
  const total = tasksList.length;
  const done = tasksList.filter((t) => t.status === "done").length;
  const doing = tasksList.filter((t) => t.status === "doing").length;
  const active = total - done;
  const completionRate = total ? Math.round((done / total) * 100) : 0;

  if (total === 0) {
    return (
      <div className="box">
        <h2 className={styles.emptyState}>
          <IconBarChart width={22} height={22} />
          Ajoutez des tâches pour voir apparaître vos statistiques ici.
        </h2>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.tiles}>
        <StatTile label="Tâches au total" value={total} />
        <StatTile label="En cours" value={doing} />
        <StatTile label="Actives" value={active} />
        <StatTile label="Taux de complétion" value={`${completionRate}%`} />
      </div>

      <div className={styles.charts}>
        <PriorityChart tasksList={tasksList} />
        <TrendChart tasksList={tasksList} />
      </div>
    </div>
  );
};
