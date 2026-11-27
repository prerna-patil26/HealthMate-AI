import { useState, useEffect } from 'react';
import {
  Sliders,
  Sun,
  Moon,
  Bell,
  Save,
  RotateCcw,
  CheckCircle2,
  Check,
} from 'lucide-react';
import SettingsSection from './SettingsSection';
import {
  THEMES,
  LANGUAGES,
  NOTIFICATION_OPTIONS,
} from '../../data/mockSettings';
import styles from './PreferencesSettings.module.css';

function PreferencesSettings({ preferences, onUpdate }) {
  const [form, setForm] = useState(preferences);
  const [savedRecently, setSavedRecently] = useState(false);

  useEffect(() => {
    setForm(preferences);
  }, [preferences]);

  const handleThemeChange = (themeId) => {
    setForm({ ...form, theme: themeId });
  };

  const handleLanguageChange = (e) => {
    setForm({ ...form, language: e.target.value });
  };

  const handleToggle = (key) => {
    setForm({
      ...form,
      notifications: {
        ...form.notifications,
        [key]: !form.notifications[key],
      },
    });
  };

  const handleSave = () => {
    onUpdate(form);
    setSavedRecently(true);
    setTimeout(() => setSavedRecently(false), 2000);
  };

  const handleReset = () => {
    setForm(preferences);
    setSavedRecently(false);
  };

  const hasChanges = JSON.stringify(form) !== JSON.stringify(preferences);

  return (
    <div className={styles.stack}>
      {/* ---------- Appearance ---------- */}
      <SettingsSection
        title="Appearance"
        description="Choose how HealthMate AI looks to you."
        icon={<Sliders size={20} />}
      >
        <div className={styles.themeGrid}>
          {THEMES.map((theme) => {
            const Icon = theme.id === 'light' ? Sun : Moon;
            const isActive = form.theme === theme.id;
            return (
              <button
                key={theme.id}
                type="button"
                className={`${styles.themeCard} ${
                  isActive ? styles.themeCardActive : ''
                }`}
                onClick={() => handleThemeChange(theme.id)}
                aria-pressed={isActive}
              >
                <div className={styles.themePreview}>
                  <div
                    className={`${styles.themePreviewInner} ${
                      theme.id === 'dark' ? styles.themePreviewDark : ''
                    }`}
                  >
                    <div className={styles.themePreviewBar} />
                    <div className={styles.themePreviewLine} />
                    <div className={styles.themePreviewLine} />
                    <div className={styles.themePreviewLineShort} />
                  </div>
                </div>
                <div className={styles.themeInfo}>
                  <div className={styles.themeHeader}>
                    <Icon size={16} />
                    <span className={styles.themeLabel}>{theme.label}</span>
                    {isActive && (
                      <span className={styles.themeCheck}>
                        <Check size={12} strokeWidth={3} />
                      </span>
                    )}
                  </div>
                  <p className={styles.themeDescription}>{theme.description}</p>
                </div>
              </button>
            );
          })}
        </div>
        <p className={styles.themeNote}>
          Dark mode applies across the app and is saved to your account.
        </p>
      </SettingsSection>

      {/* ---------- Language ---------- */}
      <SettingsSection
        title="Language"
        description="Set your preferred language for the app and AI responses."
        icon={<Sliders size={20} />}
      >
        <div className={styles.field}>
          <label htmlFor="pref-language" className={styles.label}>
            App language
          </label>
          <select
            id="pref-language"
            className={styles.select}
            value={form.language}
            onChange={handleLanguageChange}
          >
            {LANGUAGES.map((lang) => (
              <option key={lang.id} value={lang.id}>
                {lang.nativeLabel} ({lang.label})
              </option>
            ))}
          </select>
          <span className={styles.helperText}>
            Voice assistant and AI responses will use this language when available.
          </span>
        </div>
      </SettingsSection>

      {/* ---------- Notifications ---------- */}
      <SettingsSection
        title="Notifications"
        description="Choose which notifications you'd like to receive."
        icon={<Bell size={20} />}
      >
        <div className={styles.toggleList}>
          {NOTIFICATION_OPTIONS.map((option) => (
            <div key={option.id} className={styles.toggleRow}>
              <div className={styles.toggleText}>
                <span className={styles.toggleLabel}>{option.label}</span>
                <span className={styles.toggleDescription}>
                  {option.description}
                </span>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={form.notifications[option.id]}
                aria-label={`Toggle ${option.label}`}
                className={`${styles.switch} ${
                  form.notifications[option.id] ? styles.switchOn : ''
                }`}
                onClick={() => handleToggle(option.id)}
              >
                <span className={styles.switchThumb} />
              </button>
            </div>
          ))}
        </div>
      </SettingsSection>

      {/* ---------- Actions ---------- */}
      <div className={styles.actions}>
        <button
          type="button"
          className={styles.resetButton}
          onClick={handleReset}
          disabled={!hasChanges}
        >
          <RotateCcw size={14} />
          Reset
        </button>
        <button
          type="button"
          className={styles.saveButton}
          onClick={handleSave}
          disabled={!hasChanges}
        >
          {savedRecently ? (
            <>
              <CheckCircle2 size={14} />
              Saved
            </>
          ) : (
            <>
              <Save size={14} />
              Save changes
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default PreferencesSettings;