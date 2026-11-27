import { createContext, useContext, useState, useEffect } from 'react';
import { DEFAULT_SETTINGS } from '../data/mockSettings';

const STORAGE_KEY = 'healthmate_settings';

const SettingsContext = createContext(null);

// Read from localStorage on mount (with fallback to defaults)
function loadSettings() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        profile: { ...DEFAULT_SETTINGS.profile, ...(parsed.profile || {}) },
        preferences: {
          ...DEFAULT_SETTINGS.preferences,
          ...(parsed.preferences || {}),
          notifications: {
            ...DEFAULT_SETTINGS.preferences.notifications,
            ...(parsed.preferences?.notifications || {}),
          },
        },
        privacy: { ...DEFAULT_SETTINGS.privacy, ...(parsed.privacy || {}) },
        consents: { ...DEFAULT_SETTINGS.consents, ...(parsed.consents || {}) },
      };
    }
  } catch {
    // Ignore parse errors — fall back to defaults
  }
  return DEFAULT_SETTINGS;
}

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(loadSettings);

  // Persist to localStorage whenever settings change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      // localStorage might be full or disabled — ignore
    }
  }, [settings]);

  // Apply theme to <html> element
  useEffect(() => {
    const theme = settings.preferences.theme || 'light';
    document.documentElement.setAttribute('data-theme', theme);
  }, [settings.preferences.theme]);

  const updateSettings = (sectionKey, updates) => {
    setSettings((prev) => ({
      ...prev,
      [sectionKey]: {
        ...prev[sectionKey],
        ...updates,
      },
    }));
  };

  const updatePrivacy = ({ privacy, consents }) => {
    setSettings((prev) => ({
      ...prev,
      privacy,
      consents,
    }));
  };

  const setTheme = (theme) => {
    setSettings((prev) => ({
      ...prev,
      preferences: { ...prev.preferences, theme },
    }));
  };

  const toggleTheme = () => {
    setTheme(settings.preferences.theme === 'dark' ? 'light' : 'dark');
  };

  const resetAll = () => {
    setSettings(DEFAULT_SETTINGS);
  };

  const value = {
    settings,
    updateSettings,
    updatePrivacy,
    setTheme,
    toggleTheme,
    resetAll,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return ctx;
}