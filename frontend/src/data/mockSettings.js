/**
 * Mock user settings data.
 * Will be replaced with real backend + authentication in Phase 9.
 */

export const DEFAULT_SETTINGS = {
  profile: {
    fullName: 'Guest User',
    email: 'guest@healthmate.ai',
    phone: '',
    dateOfBirth: '',
    language: 'en',
  },
  preferences: {
    language: 'en',
    theme: 'light', // 'light' | 'dark'
    notifications: {
      appointmentReminders: true,
      medicineReminders: false,
      reportReady: true,
      weeklySummary: false,
    },
  },
  privacy: {
    shareWithFamily: false,
    analyticsUsage: true,
    aiTraining: false,
    marketingEmails: false,
  },
  consents: {
    healthDataProcessing: true,
    familyDataSharing: false,
    researchParticipation: false,
  },
};

// ---------- Settings sidebar sections ----------

export const SETTINGS_SECTIONS = [
  {
    id: 'profile',
    label: 'Profile',
    description: 'Personal information',
  },
  {
    id: 'preferences',
    label: 'Preferences',
    description: 'Language, notifications, and theme',
  },
  {
    id: 'privacy',
    label: 'Privacy',
    description: 'Data sharing and privacy controls',
  },
  {
    id: 'security',
    label: 'Security',
    description: 'Password and account safety',
  },
];

// ---------- Languages (per spec 5.15) ----------

export const LANGUAGES = [
  { id: 'en', label: 'English', nativeLabel: 'English' },
  { id: 'hi', label: 'Hindi', nativeLabel: 'हिंदी' },
  { id: 'mr', label: 'Marathi', nativeLabel: 'मराठी' },
  { id: 'gu', label: 'Gujarati', nativeLabel: 'ગુજરાતી' },
];

// ---------- Themes ----------

export const THEMES = [
  { id: 'light', label: 'Light', description: 'Default light theme' },
  { id: 'dark', label: 'Dark', description: 'Easier on the eyes at night' },
];

// ---------- Notification options ----------

export const NOTIFICATION_OPTIONS = [
  {
    id: 'appointmentReminders',
    label: 'Appointment reminders',
    description: 'Get notified about upcoming appointments',
  },
  {
    id: 'medicineReminders',
    label: 'Medicine reminders',
    description: 'Daily reminders for medicines you track',
  },
  {
    id: 'reportReady',
    label: 'Report analysis ready',
    description: 'Notify me when a report finishes processing',
  },
  {
    id: 'weeklySummary',
    label: 'Weekly health summary',
    description: 'Receive a summary of your health activity each week',
  },
];

// ---------- Privacy options ----------

export const PRIVACY_OPTIONS = [
  {
    id: 'shareWithFamily',
    label: 'Share with family profiles',
    description: 'Allow family members with consent to view health information',
  },
  {
    id: 'analyticsUsage',
    label: 'Anonymous usage analytics',
    description: 'Help improve HealthMate AI by sharing anonymous usage data',
  },
  {
    id: 'aiTraining',
    label: 'AI model improvement',
    description: 'Allow anonymized data to improve AI accuracy (you can turn this off anytime)',
  },
  {
    id: 'marketingEmails',
    label: 'Product updates and tips',
    description: 'Occasional emails about new features and health tips',
  },
];

// ---------- Consent options (spec Part 14) ----------

export const CONSENT_OPTIONS = [
  {
    id: 'healthDataProcessing',
    label: 'Health data processing',
    description:
      'Required to use AI assistant, symptom guidance, and report analysis',
    required: true,
  },
  {
    id: 'familyDataSharing',
    label: 'Family data sharing',
    description:
      'Share selected information with authorized family members',
    required: false,
  },
  {
    id: 'researchParticipation',
    label: 'Research participation',
    description:
      'Allow anonymized data to support healthcare research (opt-in)',
    required: false,
  },
];

// ---------- Helpers ----------

/**
 * Format a phone number as (XXX) XXX-XXXX (Indian/international style).
 */
export function formatPhone(value) {
  const digits = value.replace(/\D/g, '');
  if (digits.length <= 5) return digits;
  if (digits.length <= 10) {
    return `${digits.slice(0, 5)} ${digits.slice(5)}`;
  }
  return digits.slice(0, 15); // cap at 15 digits
}

/**
 * Validate email format.
 */
export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Get language by ID.
 */
export function getLanguageById(id) {
  return LANGUAGES.find((l) => l.id === id) || LANGUAGES[0];
}

/**
 * Get theme by ID.
 */
export function getThemeById(id) {
  return THEMES.find((t) => t.id === id) || THEMES[0];
}

/**
 * Deep merge partial settings onto defaults.
 * Useful when a user has only changed some fields.
 */
export function mergeSettings(base, partial) {
  return {
    profile: { ...base.profile, ...(partial.profile || {}) },
    preferences: {
      ...base.preferences,
      ...(partial.preferences || {}),
      notifications: {
        ...base.preferences.notifications,
        ...(partial.preferences?.notifications || {}),
      },
    },
    privacy: { ...base.privacy, ...(partial.privacy || {}) },
    consents: { ...base.consents, ...(partial.consents || {}) },
  };
}