// Set d'icônes SVG minimalistes (style trait, currentColor) utilisées dans toute l'appli
// pour remplacer les emojis par un rendu cohérent quel que soit l'OS/navigateur.

const base = {
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export const IconPlus = (props) => (
  <svg {...base} {...props}>
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

export const IconEdit = (props) => (
  <svg {...base} {...props}>
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
  </svg>
);

export const IconTrash = (props) => (
  <svg {...base} {...props}>
    <polyline points="3 6 5 6 21 6" />
    <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m2 0-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    <line x1="10" y1="11" x2="10" y2="17" />
    <line x1="14" y1="11" x2="14" y2="17" />
  </svg>
);

export const IconCalendar = (props) => (
  <svg {...base} {...props}>
    <rect x="3" y="4" width="18" height="18" rx="3" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

export const IconFlag = (props) => (
  <svg {...base} {...props}>
    <path d="M4 3v18" />
    <path d="M4 4h13l-2.5 4L17 12H4" />
  </svg>
);

export const IconCheck = (props) => (
  <svg {...base} {...props}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export const IconClipboard = (props) => (
  <svg {...base} {...props}>
    <rect x="6" y="4" width="12" height="17" rx="2" />
    <path d="M9 4V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1" />
    <polyline points="8.5 12 11 14.5 15.5 9.5" />
  </svg>
);

export const IconListChecks = (props) => (
  <svg {...base} {...props}>
    <polyline points="3.5 6 5 7.5 8 4.5" />
    <line x1="12" y1="6" x2="21" y2="6" />
    <polyline points="3.5 13 5 14.5 8 11.5" />
    <line x1="12" y1="13" x2="21" y2="13" />
    <polyline points="3.5 20 5 21.5 8 18.5" />
    <line x1="12" y1="20" x2="21" y2="20" />
  </svg>
);

export const IconCircleDashed = (props) => (
  <svg {...base} {...props}>
    <path d="M12 3c1 0 2 .15 3 .44M18.5 6a9 9 0 0 1 1.5 2.5M21 13.5a9 9 0 0 1-1 3M17 20a9 9 0 0 1-3 1.3M9 21a9 9 0 0 1-3-1.6M4 16a9 9 0 0 1-1-3.5M3.5 9A9 9 0 0 1 5.5 5.5" />
  </svg>
);

export const IconSun = (props) => (
  <svg {...base} {...props}>
    <circle cx="12" cy="12" r="4.5" />
    <line x1="12" y1="2.5" x2="12" y2="5" />
    <line x1="12" y1="19" x2="12" y2="21.5" />
    <line x1="4.2" y1="4.2" x2="5.9" y2="5.9" />
    <line x1="18.1" y1="18.1" x2="19.8" y2="19.8" />
    <line x1="2.5" y1="12" x2="5" y2="12" />
    <line x1="19" y1="12" x2="21.5" y2="12" />
    <line x1="4.2" y1="19.8" x2="5.9" y2="18.1" />
    <line x1="18.1" y1="5.9" x2="19.8" y2="4.2" />
  </svg>
);

export const IconMoon = (props) => (
  <svg {...base} {...props}>
    <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5Z" />
  </svg>
);

export const IconClock = (props) => (
  <svg {...base} {...props}>
    <circle cx="12" cy="12" r="9" />
    <polyline points="12 7 12 12 15.5 14" />
  </svg>
);

export const IconGripVertical = (props) => (
  <svg {...base} {...props}>
    <circle cx="9" cy="6" r="1" />
    <circle cx="9" cy="12" r="1" />
    <circle cx="9" cy="18" r="1" />
    <circle cx="15" cy="6" r="1" />
    <circle cx="15" cy="12" r="1" />
    <circle cx="15" cy="18" r="1" />
  </svg>
);

export const IconLayoutGrid = (props) => (
  <svg {...base} {...props}>
    <rect x="3" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="3" width="7" height="7" rx="1.5" />
    <rect x="3" y="14" width="7" height="7" rx="1.5" />
    <rect x="14" y="14" width="7" height="7" rx="1.5" />
  </svg>
);

export const IconBarChart = (props) => (
  <svg {...base} {...props}>
    <line x1="4" y1="20" x2="20" y2="20" />
    <rect x="5.5" y="13" width="3" height="7" rx="1" />
    <rect x="10.5" y="8" width="3" height="12" rx="1" />
    <rect x="15.5" y="4" width="3" height="16" rx="1" />
  </svg>
);

export const IconParty = (props) => (
  <svg {...base} {...props}>
    <path d="M5.8 11.3 2 22l10.7-3.8" />
    <path d="m11 13 6-6" />
    <path d="M15 8 20 3" />
    <path d="M18 11c1.1 0 2-.9 2-2" />
    <path d="M13 6c1.1 0 2-.9 2-2" />
  </svg>
);
