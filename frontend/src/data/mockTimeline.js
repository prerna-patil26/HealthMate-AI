/**
 * Mock health timeline events.
 * Will be replaced with real backend data in Phase 9.
 *
 * Event shape:
 * {
 *   id: string,
 *   type: 'report' | 'symptom' | 'medicine' | 'appointment' | 'conversation',
 *   title: string,
 *   subtitle: string,
 *   timestamp: ISO date string,
 *   sourceLink: string,
 *   metadata: { ... } (type-specific)
 * }
 */

// Helper to generate timestamps relative to now
const now = new Date();
const hoursAgo = (h) => new Date(now.getTime() - h * 60 * 60 * 1000).toISOString();
const daysAgo = (d) => new Date(now.getTime() - d * 24 * 60 * 60 * 1000).toISOString();

export const MOCK_TIMELINE = [
  // ---------- TODAY ----------
  {
    id: 'tl-1',
    type: 'report',
    title: 'Blood Test — Lipid Profile',
    subtitle: '6 values · 3 flagged',
    timestamp: hoursAgo(2),
    sourceLink: '/reports',
    metadata: { reportId: 'report-1', valueCount: 6, flaggedCount: 3 },
  },
  {
    id: 'tl-2',
    type: 'conversation',
    title: '"Understanding cholesterol levels"',
    subtitle: '8 messages',
    timestamp: hoursAgo(5),
    sourceLink: '/assistant',
    metadata: { messageCount: 8 },
  },

  // ---------- THIS WEEK ----------
  {
    id: 'tl-3',
    type: 'symptom',
    title: 'Fever assessment',
    subtitle: 'Self-care appropriate · Moderate severity',
    timestamp: daysAgo(2),
    sourceLink: '/symptoms',
    metadata: { outcome: 'self-care', severity: 5 },
  },
  {
    id: 'tl-4',
    type: 'medicine',
    title: 'Paracetamol',
    subtitle: 'Pain relief · OTC',
    timestamp: daysAgo(3),
    sourceLink: '/medicines',
    metadata: { medicineId: 'paracetamol' },
  },
  {
    id: 'tl-5',
    type: 'appointment',
    title: 'Dr. Sharma — Cardiologist',
    subtitle: 'Scheduled · Dec 2, 2026 at 10:30 AM',
    timestamp: daysAgo(3),
    sourceLink: '/appointments',
    metadata: {
      doctor: 'Dr. Sharma',
      specialty: 'Cardiologist',
      status: 'scheduled',
    },
  },
  {
    id: 'tl-6',
    type: 'conversation',
    title: '"When should I see a doctor?"',
    subtitle: '5 messages',
    timestamp: daysAgo(4),
    sourceLink: '/assistant',
    metadata: { messageCount: 5 },
  },

  // ---------- THIS MONTH ----------
  {
    id: 'tl-7',
    type: 'report',
    title: 'Complete Blood Count (CBC)',
    subtitle: '6 values · 0 flagged',
    timestamp: daysAgo(7),
    sourceLink: '/reports',
    metadata: { reportId: 'report-2', valueCount: 6, flaggedCount: 0 },
  },
  {
    id: 'tl-8',
    type: 'medicine',
    title: 'Metformin',
    subtitle: 'Antidiabetic · Prescription required',
    timestamp: daysAgo(9),
    sourceLink: '/medicines',
    metadata: { medicineId: 'metformin' },
  },
  {
    id: 'tl-9',
    type: 'symptom',
    title: 'Headache assessment',
    subtitle: 'See a doctor soon · Severe severity',
    timestamp: daysAgo(11),
    sourceLink: '/symptoms',
    metadata: { outcome: 'urgent', severity: 8 },
  },
  {
    id: 'tl-10',
    type: 'report',
    title: 'Thyroid Panel',
    subtitle: '4 values · 0 flagged',
    timestamp: daysAgo(12),
    sourceLink: '/reports',
    metadata: { reportId: 'report-3', valueCount: 4, flaggedCount: 0 },
  },
  {
    id: 'tl-11',
    type: 'appointment',
    title: 'Dr. Patel — General Physician',
    subtitle: 'Completed · Nov 18, 2026',
    timestamp: daysAgo(14),
    sourceLink: '/appointments',
    metadata: {
      doctor: 'Dr. Patel',
      specialty: 'General Physician',
      status: 'completed',
    },
  },
  {
    id: 'tl-12',
    type: 'medicine',
    title: 'Amoxicillin',
    subtitle: 'Antibiotic · Prescription required',
    timestamp: daysAgo(16),
    sourceLink: '/medicines',
    metadata: { medicineId: 'amoxicillin' },
  },
  {
    id: 'tl-13',
    type: 'conversation',
    title: '"Headache causes and when to worry"',
    subtitle: '12 messages',
    timestamp: daysAgo(18),
    sourceLink: '/assistant',
    metadata: { messageCount: 12 },
  },

  // ---------- EARLIER ----------
  {
    id: 'tl-14',
    type: 'report',
    title: 'Blood Sugar Test (Fasting)',
    subtitle: '3 values · 2 flagged · 1 uncertain',
    timestamp: daysAgo(23),
    sourceLink: '/reports',
    metadata: { reportId: 'report-4', valueCount: 3, flaggedCount: 2 },
  },
  {
    id: 'tl-15',
    type: 'symptom',
    title: 'Fatigue assessment',
    subtitle: 'Schedule a check-up · Mild severity',
    timestamp: daysAgo(28),
    sourceLink: '/symptoms',
    metadata: { outcome: 'follow-up', severity: 3 },
  },
];

// ---------- Category filter options ----------

export const TIMELINE_CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'report', label: 'Reports' },
  { id: 'symptom', label: 'Symptoms' },
  { id: 'medicine', label: 'Medicines' },
  { id: 'appointment', label: 'Appointments' },
  { id: 'conversation', label: 'Conversations' },
];

// ---------- Date range options ----------

export const DATE_RANGES = [
  { id: 'all', label: 'All time' },
  { id: 'today', label: 'Today' },
  { id: 'week', label: 'This week' },
  { id: 'month', label: 'This month' },
];

// ---------- Helper: filter events by category ----------

export function filterByCategory(events, categoryId) {
  if (!categoryId || categoryId === 'all') return events;
  return events.filter((e) => e.type === categoryId);
}

// ---------- Helper: filter events by date range ----------

export function filterByDateRange(events, rangeId) {
  if (!rangeId || rangeId === 'all') return events;

  const now = new Date();
  const cutoffMap = {
    today: 1,          // last 24h
    week: 7,           // last 7 days
    month: 30,         // last 30 days
  };
  const daysBack = cutoffMap[rangeId];
  if (!daysBack) return events;

  const cutoff = new Date(now.getTime() - daysBack * 24 * 60 * 60 * 1000);
  return events.filter((e) => new Date(e.timestamp) >= cutoff);
}

// ---------- Helper: group events by date bucket ----------

export function groupEventsByDate(events) {
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfWeek = new Date(startOfToday.getTime() - 6 * 24 * 60 * 60 * 1000);
  const startOfMonth = new Date(startOfToday.getTime() - 29 * 24 * 60 * 60 * 1000);

  const groups = {
    today: [],
    thisWeek: [],
    thisMonth: [],
    earlier: [],
  };

  // Sort events by timestamp (newest first)
  const sorted = [...events].sort(
    (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
  );

  sorted.forEach((event) => {
    const eventDate = new Date(event.timestamp);
    if (eventDate >= startOfToday) {
      groups.today.push(event);
    } else if (eventDate >= startOfWeek) {
      groups.thisWeek.push(event);
    } else if (eventDate >= startOfMonth) {
      groups.thisMonth.push(event);
    } else {
      groups.earlier.push(event);
    }
  });

  return groups;
}

// ---------- Helper: format relative time ----------

export function formatRelativeTime(isoString) {
  if (!isoString) return '';

  const then = new Date(isoString);
  const now = new Date();
  const diffMs = now - then;
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMinutes < 1) return 'Just now';
  if (diffMinutes < 60) return `${diffMinutes} min ago`;
  if (diffHours < 24) return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`;
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
  }
  return then.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

// ---------- Helper: search events ----------

export function searchEvents(events, query) {
  if (!query || !query.trim()) return events;
  const q = query.toLowerCase().trim();
  return events.filter(
    (e) =>
      e.title.toLowerCase().includes(q) ||
      e.subtitle.toLowerCase().includes(q) ||
      e.type.toLowerCase().includes(q)
  );
}